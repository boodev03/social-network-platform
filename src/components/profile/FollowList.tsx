import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
interface User {
  _id: { $oid: string };
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  link: string;
  email: string;
  password: string;
}

interface Follow {
  _id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

interface FollowersListProps {
  username: string;
}

export default function FollowersList({ username }: FollowersListProps) {
  const [activeTab, setActiveTab] = useState("followers");
  const [followingUsers, setFollowingUsers] = useState<User[]>([]);
  const [followersUsers, setFollowersUsers] = useState<User[]>([]);

  const currentUser = ARRAY_LIST_USER.find(
    (user: User) => user.username === username
  );

  if (!currentUser) return <div>Người dùng không tồn tại.</div>;

  const followingList = ARRAY_LIST_USER_FL.filter(
    (follow: Follow) => follow.follower_id === currentUser._id.$oid
  );

  const initialFollowingUsers = ARRAY_LIST_USER.filter((user: User) =>
    followingList.some(
      (follow: Follow) => follow.following_id === user._id.$oid
    )
  );

  const followersList = ARRAY_LIST_USER_FL.filter(
    (follow: Follow) => follow.following_id === currentUser._id.$oid
  );

  const initialFollowersUsers = ARRAY_LIST_USER.filter((user: User) =>
    followersList.some((follow: Follow) => follow.follower_id === user._id.$oid)
  );

  if (followingUsers.length === 0) setFollowingUsers(initialFollowingUsers);
  if (followersUsers.length === 0) setFollowersUsers(initialFollowersUsers);

  const toggleFollow = (user: User) => {
    if (followingUsers.some((u) => u._id.$oid === user._id.$oid)) {
      setFollowingUsers(
        followingUsers.filter((u) => u._id.$oid !== user._id.$oid)
      );
    } else {
      setFollowingUsers([...followingUsers, user]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          {/* Hiển thị avatar của 3 người đầu tiên */}
          <div className="flex -space-x-2">
            {followersUsers.slice(0, 3).map((user) => (
              <Avatar
                key={user._id.$oid}
                className="w-8 h-8 border-2 border-white"
              >
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback>
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          {followersUsers.length > 3 && (
            <p className="text-sm text-gray-500">
              {followersUsers.length - 3} người theo dõi
            </p>
          )}
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[680px] w-full bg-white rounded-lg shadow-lg p-4">
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
            <TabsTrigger value="followers" className="flex-1">
              Người theo dõi
              <span className="ml-1 text-gray-500">
                {followersUsers.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="following" className="flex-1">
              Đang theo dõi
              <span className="ml-1 text-gray-500">
                {followingUsers.length}
              </span>
            </TabsTrigger>
          </TabsList>

          {/* Danh sách người theo dõi */}
          <TabsContent value="followers">
            {followersUsers.map((user) => (
              <div key={user._id.$oid} className="flex items-center gap-3 py-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback>
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <a
                    href={`/profile/${user.username}`}
                    className="font-medium hover:underline decoration-[1px]"
                  >
                    {user.username}
                  </a>
                  <p className="text-sm text-gray-500">{user.fullName}</p>
                </div>
                <Button
                  variant="outline"
                  className="text-sm px-4"
                  onClick={() => toggleFollow(user)}
                >
                  {followingUsers.some((u) => u._id.$oid === user._id.$oid)
                    ? "Đang theo dõi"
                    : "Theo dõi"}
                </Button>
              </div>
            ))}
          </TabsContent>

          {/* Danh sách đang theo dõi */}
          <TabsContent value="following">
            {followingUsers.map((user) => (
              <div key={user._id.$oid} className="flex items-center gap-3 py-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback>
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <a
                    href={`/profile/${user.username}`}
                    className="font-medium hover:underline decoration-[1px]"
                  >
                    {user.username}
                  </a>
                  <p className="text-sm text-gray-500">{user.fullName}</p>
                </div>
                <Button
                  variant="outline"
                  className="text-sm px-4"
                  onClick={() => toggleFollow(user)}
                >
                  Đang theo dõi
                </Button>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// Dữ liệu user.json
const ARRAY_LIST_USER = [
  {
    _id: { $oid: "64fee1a4f1e3c2a3b6e1d2f9" },
    username: "chaanz.ie",
    fullName: "Huyền Trân",
    avatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/07/anh-avatar-dep-cho-con-gai-2.jpg.webp",
    bio: "Cứ dịu dàng, cứ chân thành vui vẻ\nCứ yêu đời, đời cũng sẽ yêu ta.",
    link: "https://example.com/huyentran_ie",
    email: "huyentran@example.com",
    password: "password123",
  },
  {
    _id: { $oid: "64fee1a5f1e3c2a3b6e1d2fa" },
    username: "baochaam03",
    fullName: "Mari Bảo Trâm",
    avatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/07/anh-avatar-dep-cho-con-gai-3.jpg.webp",
    bio: "✨ Yêu thích lập trình và thiết kế UI/UX",
    link: "https://example.com/baochaam03",
    email: "baochaam03@example.com",
    password: "password123",
  },
  {
    _id: { $oid: "64fee1a6f1e3c2a3b6e1d2fb" },
    username: "nguyenvanA",
    fullName: "Nguyễn Văn A",
    avatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/07/anh-avatar-dep-cho-con-gai-4.jpg.webp",
    bio: "📚 Sinh viên CNTT, đam mê học hỏi",
    link: "https://example.com/nguyenvanA",
    email: "nguyenvanA@example.com",
    password: "nguyenvanA123",
  },
  {
    _id: { $oid: "64fee1a7f1e3c2a3b6e1d2fc" },
    username: "lethiminh",
    fullName: "Lê Thị Minh",
    avatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/07/anh-avatar-dep-cho-con-gai-5.jpg.webp",
    bio: "🌸 Yêu thích du lịch và chụp ảnh",
    link: "https://example.com/lethiminh",
    email: "lethiminh@example.com",
    password: "lethiminh123",
  },
  {
    _id: { $oid: "64fee1a8f1e3c2a3b6e1d2fd" },
    username: "dangtrung",
    fullName: "Đặng Trung",
    avatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/07/anh-avatar-dep-cho-con-gai-6.jpg.webp",
    bio: "💪 Tập gym và chơi game chuyên nghiệp",
    link: "https://example.com/dangtrung",
    email: "dangtrung@example.com",
    password: "dangtrung123",
  },
  {
    _id: { $oid: "64fee1a9f1e3c2a3b6e1d2fe" },
    username: "buiha",
    fullName: "Bùi Hà",
    avatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/07/anh-avatar-dep-cho-con-gai-1.jpg.webp",
    bio: "🎨 Designer tự do và blogger",
    link: "https://example.com/buiha",
    email: "buiha@example.com",
    password: "buiha123",
  },
];

// Dữ liệu follow.json
const ARRAY_LIST_USER_FL = [
  {
    _id: "64fee202f1e3c2a3b6e1d300",
    follower_id: "64fee1a4f1e3c2a3b6e1d2f9",
    following_id: "64fee1a7f1e3c2a3b6e1d2fc",
    created_at: "2025-03-12T10:12:00Z",
  },
  {
    _id: "64fee203f1e3c2a3b6e1d301",
    follower_id: "64fee1a4f1e3c2a3b6e1d2f9",
    following_id: "64fee1a8f1e3c2a3b6e1d2fd",
    created_at: "2025-03-12T10:13:00Z",
  },
  {
    _id: "64fee1baf1e3c2a3b6e1d2ff",
    follower_id: "64fee1a5f1e3c2a3b6e1d2fa",
    following_id: "64fee1a4f1e3c2a3b6e1d2f9",
    created_at: "2025-03-12T10:00:00Z",
  },
  {
    _id: "64fee1bcf1e3c2a3b6e1d301",
    follower_id: "64fee1a7f1e3c2a3b6e1d2fc",
    following_id: "64fee1a4f1e3c2a3b6e1d2f9",
    created_at: "2025-03-12T10:10:00Z",
  },
  {
    _id: "64fee1bdf1e3c2a3b6e1d302",
    follower_id: "64fee1a8f1e3c2a3b6e1d2fd",
    following_id: "64fee1a4f1e3c2a3b6e1d2f9",
    created_at: "2025-03-12T10:15:00Z",
  },
  {
    _id: "64fee1bef1e3c2a3b6e1d303",
    follower_id: "64fee1a9f1e3c2a3b6e1d2fe",
    following_id: "64fee1a4f1e3c2a3b6e1d2f9",
    created_at: "2025-03-12T10:20:00Z",
  },
];
