import axios from 'axios';

const API_URL = import.meta.env.VITE_USER_SERVICE_URL;

interface RegisterResponse {
    success: boolean;
    message: string;
    data: {
        id: string;
        username: string;
        createdAt: string;
    };
}

interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
    data: {
        id: string;
        username: string;
    };
}

interface LogoutResponse {
    success: boolean;
    message: string;
}


export const register = async (
    username: string,
    password: string,
    email: string
): Promise<RegisterResponse> => {
    try {
        const response = await axios.post<RegisterResponse>(
            `${API_URL}/users/register`,
            { username, password, email }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw {
                success: false,
                message: 'Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.',
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
};

export const login = async (
    username: string,
    password: string
): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(
            `${API_URL}/auth/login`,
            { username, password }
        );

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw {
                success: false,
                message: 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.',
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
};

export const logout = async (): Promise<LogoutResponse> => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Không tìm thấy token đăng nhập');
        }

        const response = await axios.post<LogoutResponse>(
            `${API_URL}/users/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        localStorage.removeItem('token');

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw {
                success: false,
                message: 'Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại sau.',
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
};

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
