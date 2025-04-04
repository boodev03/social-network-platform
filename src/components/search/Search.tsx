import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X as ClearIcon } from "lucide-react";

export default function Search() {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-black p-4">
      <p className="font-bold p-4">Tìm kiếm</p>
      <Card className="w-full max-w-4xl p-4 rounded-xl shadow-lg">
        {/* Thanh tìm kiếm */}
        <div className="flex items-center space-x-2 relative w-full">
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pr-10 w-full"
          />

          <button
            className="absolute right-4 p-1 text-gray-500 hover:text-gray-700"
            onClick={() => setSearchText("")}
          >
            {searchText ? <ClearIcon size={18} /> : <SearchIcon size={18} />}
          </button>
        </div>

        {/* Gợi ý theo dõi */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Gợi ý theo dõi</p>
          <div className="space-y-4">
            {suggestions.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-300"
              >
                {/* Thông tin người dùng */}
                <div className="flex items-start gap-3 ">
                  <img
                    src={user.avt}
                    alt={user.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.name}</p>
                    <p className="text-sm">{user.bio}</p>
                    <p className="text-sm text-gray-400">
                      {user.followers.toLocaleString()} người theo dõi
                    </p>
                  </div>
                </div>

                {/* Nút Theo dõi */}
                <Button
                  variant="outline"
                  className="bg-white text-black border-gray-750 hover:bg-gray-100 px-4 py-1"
                >
                  Theo dõi
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

const suggestions = [
  {
    username: "tutrongtrangsach_official",
    name: "Từ trong trang sách",
    bio: "Thấy hay là chụp",
    avt: "https://example.com/tutrongtrangsach.jpg",
    followers: 76900,
  },
  {
    username: "nhathobinz",
    name: "Nhà thơ BinZ",
    bio: "Ở đây có thơ thần",
    avt: "https://example.com/nhathobinz.jpg",
    followers: 200000,
  },
  {
    username: "vunvatnee",
    name: "Vụn Vặt",
    bio: "Mình viết và vẽ nên mấy điều be bé 🥳\n📩 Contact for work: vunvatnee@gmail.com",
    avt: "https://example.com/vunvatnee.jpg",
    followers: 21900,
  },
  {
    username: "nguoi.doc.sach",
    name: "Người Đọc Sách",
    bio: "Cuộc đời ta thay đổi theo 2 cách: Qua những cuốn sách ta đọc và qua những người ta gặp.",
    avt: "https://example.com/nguoi.docsach.jpg",
    followers: 298000,
  },
  {
    username: "tutrongtrangsach_official",
    name: "Từ trong trang sách",
    bio: "Thấy hay là chụp",
    avt: "https://example.com/tutrongtrangsach.jpg",
    followers: 76900,
  },
  {
    username: "nhathobinz",
    name: "Nhà thơ BinZ",
    bio: "Ở đây có thơ thần",
    avt: "https://example.com/nhathobinz.jpg",
    followers: 200000,
  },
  {
    username: "vunvatnee",
    name: "Vụn Vặt",
    bio: "Mình viết và vẽ nên mấy điều be bé 🥳\n📩 Contact for work: vunvatnee@gmail.com",
    avt: "https://example.com/vunvatnee.jpg",
    followers: 21900,
  },
  {
    username: "nguoi.doc.sach",
    name: "Người Đọc Sách",
    bio: "Cuộc đời ta thay đổi theo 2 cách: Qua những cuốn sách ta đọc và qua những người ta gặp.",
    avt: "https://example.com/nguoi.docsach.jpg",
    followers: 298000,
  },
];
