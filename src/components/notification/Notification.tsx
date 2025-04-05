import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageSquare, MessageCircle, UserPlus } from "lucide-react";

interface NotificationItemProps {
    id: string;
    user_id: string;
    comment_id?: string;
    post_id?: string;
    type: "post" | "like" | "comment" | "follow";
    content?: string;
    is_read: boolean;
    created_at: string;
    avatarUrl?: string;
    username: string;
}

const notifications: NotificationItemProps[] = [
    {
        id: "1",
        user_id: "boo",
        post_id: "123",
        type: "post",
        content: "Cậu là người tuyệt nhất",
        is_read: false,
        created_at: "2025-04-05T12:00:00Z",
        avatarUrl: "https://i.pravatar.cc/150?img=3",
        username: "boo",
    },
    {
        id: "2",
        user_id: "boo",
        post_id: "123",
        type: "like",
        is_read: false,
        created_at: "2025-04-05T12:01:00Z",
        avatarUrl: "https://i.pravatar.cc/150?img=4",
        username: "boo",
    },
    {
        id: "3",
        user_id: "boo",
        comment_id: "456",
        post_id: "123",
        type: "comment",
        content: "Thật tuyệt!",
        is_read: true,
        created_at: "2025-04-05T12:02:00Z",
        avatarUrl: "https://i.pravatar.cc/150?img=6",
        username: "boo",
    },
    {
        id: "4",
        user_id: "boo",
        type: "follow",
        is_read: true,
        created_at: "2025-04-05T12:03:00Z",
        avatarUrl: "https://i.pravatar.cc/150?img=5",
        username: "boo",
    },
];

export default function Notification() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-white text-black p-4">
            <p className="font-bold p-4">Thông báo</p>

            {/* Card chứa tất cả thông báo */}
            <Card className="w-full max-w-4xl p-4 rounded-xl shadow-lg space-y-3">
                {notifications.map((item, index) => (
                    <div
                        key={index}
                        className={`flex gap-3 items-start border-b last:border-b-0 pb-3 transition-opacity ${item.is_read ? "text-gray-500" : "text-gray-900"
                            }`}
                    >

                        {/* Avatar */}
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={item.avatarUrl} />
                            <AvatarFallback>{item.username[0].toUpperCase()}</AvatarFallback>
                        </Avatar>

                        {/* Nội dung thông báo */}
                        <div className="flex flex-col w-full">
                            <div className="flex items-center gap-1">
                                <span className="font-semibold">{item.username}</span>
                                <span className="text-gray-400 text-sm">{new Date(item.created_at).toLocaleTimeString()}</span>
                            </div>

                            {/* Nội dung + Icon */}
                            <div className="flex items-center gap-2">
                                {item.type === "post" && <MessageSquare className="w-4 h-4 text-blue-500" />}
                                {item.type === "like" && <Heart className="w-4 h-4 text-red-500" />}
                                {item.type === "comment" && <MessageCircle className="w-4 h-4 text-green-500" />}
                                {item.type === "follow" && <UserPlus className="w-4 h-4 text-purple-500" />}

                                {/* Nội dung chi tiết */}
                                {item.type === "post" && <p className="text-gray-800">Đã đăng bài viết</p>}
                                {item.type === "like" && <p className="text-gray-800">Đã thích bài viết của bạn</p>}
                                {item.type === "comment" && <p className="text-gray-800">Đã bình luận: "{item.content}"</p>}
                                {item.type === "follow" && <p className="text-gray-500 text-sm">Đã theo dõi bạn</p>}
                            </div>
                        </div>
                    </div>
                ))}
            </Card>
        </div>
    );
}
