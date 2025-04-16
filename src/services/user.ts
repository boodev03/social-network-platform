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
    data: {
        success: boolean;
        message: string;
        accessToken: string;
        data: {
            username: string;
            id: string;
        };
    }

}

interface UserProfile {
    data: {
        id: string;
        username: string;
        email: string;
        fullname: string;
        link: string;
        bio: string;
        avatar: string;
    }

}

interface LogoutResponse {
    success: boolean;
    message: string;
}

export const register = async (
    username: string,
    fullname: string,
    password: string,
    email: string
): Promise<RegisterResponse> => {
    try {
        const response = await axios.post<RegisterResponse>(
            `${API_URL}/users/register`,
            { username, password, email, fullname }
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

        if (response.data.data.accessToken) {
            localStorage.setItem('token', response.data.data.accessToken);
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


export const getMe = async (): Promise<UserProfile> => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Không tìm thấy token đăng nhập');
        }

        const response = await axios.get<UserProfile>(`${API_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw {
                success: false,
                message: 'Đã xảy ra lỗi khi lấy thông tin người dùng. Vui lòng thử lại sau.',
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
}

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

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
    try {
        const response = await axios.get<UserProfile>(`${API_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw {
                success: false,
                message: 'Không thể lấy thông tin người dùng.',
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

