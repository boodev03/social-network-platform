import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_USER_SERVICE_URL;

// Cookie keys
const COOKIE_KEYS = {
    USER: 'user_data',
    TOKEN: 'auth_token'
};

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
    data: {
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            username: string;
            email: string;
        };
    }
}

export interface UserProfile {
    _id: string;
    username: string;
    email: string;
    fullname: string;
    link: string;
    bio: string;
    avatar: string;
}

interface UpdateProfilePayload {
    data: {
        id: string;
        username: string;
        email: string;
        fullname: string;
        link: string;
        bio: string;
        avatar: string;
    };
}

interface LogoutResponse {
    success: boolean;
    message: string;
}

export const register = async (
    username: string,
    password: string,
    email: string,
    fullname: string
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
            Cookies.set(COOKIE_KEYS.TOKEN, response.data.data.accessToken, {
                expires: 7,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });
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
        const token = Cookies.get(COOKIE_KEYS.TOKEN);

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

export const updateProfileWithFormData = async (formData: FormData): Promise<UpdateProfilePayload> => {
    try {
        const token = Cookies.get(COOKIE_KEYS.TOKEN);
        if (!token) throw new Error("Không tìm thấy token đăng nhập");

        const response = await axios.patch<UpdateProfilePayload>(
            `${API_URL}/users/profile`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw {
                success: false,
                message: "Đã xảy ra lỗi khi cập nhật thông tin người dùng. Vui lòng thử lại sau.",
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }
};

export const logout = async (): Promise<LogoutResponse> => {
    try {
        const token = Cookies.get(COOKIE_KEYS.TOKEN);

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

        Cookies.remove(COOKIE_KEYS.TOKEN);
        Cookies.remove(COOKIE_KEYS.USER);

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

export const getUsersByIds = async (userIds: string[]): Promise<UserProfile[]> => {
    try {
        const response = await axios.post<{ success: boolean, data: UserProfile[] }>(`${API_URL}/users/get-users-by-ids`, {
            userIds
        });
        return response.data.data;
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
        const token = Cookies.get(COOKIE_KEYS.TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

