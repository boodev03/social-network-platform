import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X as ClearIcon } from "lucide-react";
import { searchUsers } from "@/services/search";

// Khai báo kiểu dữ liệu cho User
interface User {
  avatar?: string;
  username?: string;
  fullname?: string;
}

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 8;

  const fetchUsers = async (isNewSearch = false) => {
    if (isLoading || (!hasMore && !isNewSearch)) return;

    setIsLoading(true);
    setError("");
    try {
      const data = await searchUsers(searchText, isNewSearch ? 1 : page, limit);

      console.log("Dữ liệu tìm kiếm:", data);

      if (data.status) {
        setUsers((prevUsers) =>
          isNewSearch ? data.users : [...prevUsers, ...data.users]
        );
        setPage((prevPage) => (isNewSearch ? 2 : prevPage + 1));
        setHasMore(data.users.length === limit);
      } else {
        setHasMore(false);
        if (isNewSearch) setUsers([]);
      }
    } catch (err) {
      console.error("Lỗi khi tìm kiếm:", err);
      setError("Đã xảy ra lỗi khi tìm kiếm.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchUsers(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        hasMore &&
        !isLoading
      ) {
        fetchUsers();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-black p-4">
      <p className="font-bold p-4">Tìm kiếm</p>
      <Card className="w-full max-w-4xl p-4 rounded-xl shadow-lg">
        <div className="flex items-center space-x-2 relative w-full">
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-10 w-full"
          />
          <button
            className="absolute right-4 p-1 text-gray-500 hover:text-gray-700"
            onClick={() => {
              setSearchText("");
              setUsers([]);
              setPage(1);
              setHasMore(true);
            }}
          >
            {searchText ? <ClearIcon size={18} /> : <SearchIcon size={18} />}
          </button>
        </div>

        <div className="mt-4">
          {isLoading && users.length === 0 ? (
            <p className="text-center text-gray-500">Đang tải...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : users.length > 0 ? (
            users.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-300 py-2"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.fullname}</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="bg-white text-black border-gray-750 hover:bg-gray-100 px-4 py-1"
                >
                  Theo dõi
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Nhập từ khóa để tìm kiếm.</p>
          )}

          {isLoading && users.length > 0 && (
            <p className="text-center text-gray-500 mt-4">Đang tải thêm...</p>
          )}
          {!hasMore && users.length > 0 && (
            <p className="text-center text-gray-500 mt-4">Không còn người dùng.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
