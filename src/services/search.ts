const searchServiceUrl = import.meta.env.VITE_SEARCH_SERVICE_URL;

/**
 * Gửi yêu cầu tìm kiếm người dùng.
 * @param searchText - Từ khóa tìm kiếm.
 * @param page - Trang hiện tại.
 * @param limit - Số lượng kết quả trên mỗi trang.
 * @returns Dữ liệu từ API.
 */
export const searchUsers = async (
    searchText: string,
    page: number = 1,
    limit: number = 8
): Promise<any> => {
    try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        if (!token) {
            throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
        }

        const response = await fetch(
            `${searchServiceUrl}/search?text=${encodeURIComponent(searchText)}&page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Lỗi API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Lỗi khi gọi API tìm kiếm:", error);
        throw error;
    }
};