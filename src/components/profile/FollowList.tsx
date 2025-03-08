import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const followers = [
  {
    id: 1,
    username: "baochaam03",
    fullName: "Mari Bảo Trâm",
    avatar: "https://example.com/avatar1.jpg",
    following: true,
  },
  {
    id: 2,
    username: "nguyenvanA",
    fullName: "Nguyễn Văn A",
    avatar: "https://example.com/avatar2.jpg",
    following: false,
  },
  {
    id: 3,
    username: "lethiminh",
    fullName: "Lê Thị Minh",
    avatar: "https://example.com/avatar3.jpg",
    following: false,
  },
  {
    id: 4,
    username: "dangtrung",
    fullName: "Đặng Trung",
    avatar: "https://example.com/avatar10.jpg",
    following: true,
  },
  {
    id: 5,
    username: "buiha",
    fullName: "Bùi Hà",
    avatar: "https://example.com/avatar11.jpg",
    following: true,
  },
];

const following = [
  {
    id: 1,
    username: "chaanz",
    fullName: "Chaan",
    avatar: "https://example.com/avatar8.jpg",
    following: true,
  },
  {
    id: 2,
    username: "huyentran",
    fullName: "Huyền Trân",
    avatar: "https://example.com/avatar9.jpg",
    following: true,
  },
  {
    id: 3,
    username: "dangtrung",
    fullName: "Đặng Trung",
    avatar: "https://example.com/avatar10.jpg",
    following: true,
  },
  {
    id: 4,
    username: "buiha",
    fullName: "Bùi Hà",
    avatar: "https://example.com/avatar11.jpg",
    following: true,
  },
  {
    id: 5,
    username: "baochaam03",
    fullName: "Mari Bảo Trâm",
    avatar: "https://example.com/avatar1.jpg",
    following: true,
  },
];

export default function FollowersList() {
  const [activeTab, setActiveTab] = useState("followers");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          {/* Hiển thị avatar của 3 người đầu tiên */}
          <div className="flex -space-x-2">
            {followers.slice(0, 3).map((user) => (
              <Avatar key={user.id} className="w-8 h-8 border-2 border-white">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback>
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>

          {/* Hiển thị số lượng còn lại nếu có hơn 3 người */}
          {followers.length > 3 && (
            <p className="text-sm text-gray-500">
              {followers.length - 3} người theo dõi
            </p>
          )}
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md w-full bg-white rounded-lg shadow-lg p-4">
        {/* Tiêu đề thay đổi theo tab */}
        <h2 className="text-lg font-bold text-center pb-2 border-b">
          {activeTab === "followers" ? "Người theo dõi" : "Đang theo dõi"}
        </h2>

        <Tabs
          defaultValue="followers"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="flex w-full border-b">
            <TabsTrigger value="followers" className="flex-1 font-medium">
              Người theo dõi{" "}
              <span className="ml-1 text-gray-500">{followers.length}</span>
            </TabsTrigger>
            <TabsTrigger value="following" className="flex-1 text-gray-400">
              Đang theo dõi{" "}
              <span className="ml-1 text-gray-500">{following.length}</span>
            </TabsTrigger>
          </TabsList>

          {/* Danh sách người theo dõi */}
          <TabsContent value="followers">
            {followers.map((user) => (
              <div key={user.id} className="flex items-center gap-3 py-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback>
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.fullName}</p>
                </div>
                <Button variant="outline" className="text-sm px-4">
                  {user.following ? "Đang theo dõi" : "Theo dõi"}
                </Button>
              </div>
            ))}
          </TabsContent>

          {/* Danh sách đang theo dõi */}
          <TabsContent value="following">
            {following.map((user) => (
              <div key={user.id} className="flex items-center gap-3 py-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback>
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.fullName}</p>
                </div>
                <Button variant="outline" className="text-sm px-4">
                  {user.following ? "Đang theo dõi" : "Theo dõi"}
                </Button>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
