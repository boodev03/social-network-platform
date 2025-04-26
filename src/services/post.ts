import { CreatePostRequest, Post } from "@/types/post";
import axios from "axios";
import Cookies from "js-cookie";
import { getUsersByIds } from "./user";

const API_URL = "http://localhost:8090/api/posts";

// Cookie keys
const COOKIE_KEYS = {
    TOKEN: "auth_token",
};

// Response interfaces
interface PostResponse {
    success: boolean;
    message: string;
    data: Post;
    statusCode: number;
}

interface PostsResponse {
    success: boolean;
    message: string;
    data: Post[];
    statusCode: number;
}

interface PollData extends CreatePostRequest {
    poll: {
        poll_options: {
            content: string;
        }[];
    };
}

/**
 * Tạo một bài post mới với các file đính kèm
 * @param postData - Dữ liệu bài post cần tạo
 * @param files - Các file hình ảnh cần upload
 * @returns Thông tin bài post đã tạo
 */
export const createPost = async (postData: CreatePostRequest, files?: File[]): Promise<Post> => {
    try {
        const token = Cookies.get(COOKIE_KEYS.TOKEN);

        if (!token) {
            throw new Error("Không tìm thấy token xác thực. Vui lòng đăng nhập lại.");
        }

        // Nếu không có files, gửi request JSON thông thường
        if (!files || files.length === 0) {
            const response = await axios.post<PostResponse>(
                `${API_URL}/normals`,
                postData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data.data;
        }

        // Nếu có files, sử dụng FormData
        const formData = new FormData();

        // Thêm dữ liệu post dưới dạng JSON
        Object.entries(postData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                // Xử lý các mảng (hashtags, user_tags)
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, String(value));
            }
        });

        // Thêm files
        files.forEach(file => {
            formData.append('files', file);
        });

        const response = await axios.post<PostResponse>(
            `${API_URL}/normals`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
            }
        );

        return response.data.data;
    } catch (error) {
        console.error("Lỗi khi tạo bài post:", error);
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw {
                success: false,
                message: "Đã xảy ra lỗi khi tạo bài viết. Vui lòng thử lại sau.",
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }
};

/**
 * Lấy tất cả bài viết từ API với phân trang
 * @param page - Số trang, mặc định là 1
 * @param limit - Số lượng bài viết trên mỗi trang, mặc định là 8
 * @returns Promise chứa dữ liệu các bài viết
 */
export const getAllPosts = async (page: number = 1, limit: number = 8): Promise<PostsResponse> => {
    try {
        const token = Cookies.get(COOKIE_KEYS.TOKEN);

        const response = await axios.get<PostsResponse>(
            `${API_URL}/all`,
            {
                params: { page, limit },
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                }
            }
        );

        const data = response.data;

        // Lấy thông tin người tạo cho mỗi bài viết
        if (data.data && Array.isArray(data.data)) {
            // Lấy danh sách tất cả creator_id từ các bài viết
            const creatorIds = data.data
                .map(post => post.creator_id)
                .filter(id => id) // Lọc bỏ các giá trị null/undefined
                .filter((id, index, self) => self.indexOf(id) === index); // Loại bỏ các id trùng lặp

            if (creatorIds.length > 0) {
                try {
                    // Gọi API một lần duy nhất để lấy thông tin của tất cả người dùng
                    const userProfiles = await getUsersByIds(creatorIds);

                    // Tạo map để tra cứu nhanh thông tin người dùng theo id
                    const userMap = new Map();
                    userProfiles.forEach(profile => {
                        userMap.set(profile._id, profile);
                    });

                    // Gán thông tin người tạo vào từng bài viết
                    data.data.forEach((post, index) => {
                        if (post.creator_id && userMap.has(post.creator_id)) {
                            data.data[index].creator = userMap.get(post.creator_id);
                        }
                    });
                } catch (error) {
                    console.error("Không thể lấy thông tin người dùng cho các bài viết:", error);
                }
            }
        }

        return data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bài post:", error);
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw {
                success: false,
                message: "Đã xảy ra lỗi khi tải bài viết. Vui lòng thử lại sau.",
                error: error instanceof Error ? error.message : "Unknown error",
                data: []
            };
        }
    }
};

/**
 * Tạo một poll mới
 * @param pollData - Dữ liệu poll cần tạo
 * @returns Thông tin poll đã tạo
 */
export const createPoll = async (pollData: PollData): Promise<Post> => {
    try {
        const token = Cookies.get(COOKIE_KEYS.TOKEN);

        if (!token) {
            throw new Error('Không tìm thấy token đăng nhập');
        }

        const response = await axios.post<PostResponse>(
            `${API_URL}/polls`,
            pollData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data.data;
    } catch (error) {
        console.error("Lỗi khi tạo poll:", error);
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw {
                success: false,
                message: "Đã xảy ra lỗi khi tạo poll. Vui lòng thử lại sau.",
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }
};

/**
 * Vote cho một option trong poll
 * @param pollId - ID của poll
 * @param optionId - ID của option được chọn
 * @returns Kết quả sau khi vote
 */
export const votePoll = async (pollId: string, optionId: string): Promise<{
    success: boolean;
    message: string;
    data: Post;
    statusCode: number;
}> => {
    try {
        const token = Cookies.get(COOKIE_KEYS.TOKEN);

        if (!token) {
            throw new Error('Không tìm thấy token đăng nhập');
        }

        const response = await axios.post<{
            success: boolean;
            message: string;
            data: Post;
            statusCode: number;
        }>(
            `${API_URL}/${pollId}/vote`,
            { optionId },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Lỗi khi vote poll:", error);
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw {
                success: false,
                message: "Đã xảy ra lỗi khi vote. Vui lòng thử lại sau.",
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }
};