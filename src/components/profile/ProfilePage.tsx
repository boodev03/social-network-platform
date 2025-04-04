import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FollowersList from "./FollowList";
import CreatePostDialog from "../createPost/CreatePost";
import EditProfile from "./editProfile/EditProfile"; // Import modal EditProfile
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function ProfilePage() {
  const name: string = "Huyền Trân";
  const username: string = "chaanz.ie";
  const [bio, setBio] = useState<string>(
    "Cứ dịu dàng, cứ chân thành vui vẻ\nCứ yêu đời, đời cũng sẽ yêu ta."
  );
  const [link, setLink] = useState<string>(
    "https://www.facebook.com/nhully.tran"
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>(
    "https://www.caythuocdangian.com/wp-content/uploads/anh-dai-dien-61.jpg"
  );

  const handleSaveProfile = (
    newBio: string,
    newLink: string,
    newAvatar?: string | null
  ) => {
    setBio(newBio);
    setLink(newLink);
    setAvatar(newAvatar ?? "");
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-black p-4">
      <p className="font-bold p-4">Trang cá nhân</p>
      <Card className="w-full max-w-2xl p-6 rounded-xl shadow-lg">
        <div className="flex items-start justify-between">
          {/* Thông tin cơ bản */}
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold">{name}</h2>
            <p className="text-sm text-gray-500">{username}</p>
            <p className="text-sm text-gray-700 whitespace-pre-line">{bio}</p>

            {/* Hiển thị link nếu có */}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black-600 text-sm underline mt-1"
              >
                {link}
              </a>
            )}
            <FollowersList username={username} />
          </div>

          {/* Avatar */}
          <Avatar className="w-30 h-30 border border-gray-400">
            <AvatarImage
              src={avatar ?? undefined}
              alt="User Avatar"
              style={{ objectFit: "cover" }}
            />
          </Avatar>
        </div>

        {/* Button mở modal EditProfile */}
        <Button
          variant="outline"
          className="w-full mt-1 p-4.5 bg-white text-black border-gray-750 hover:bg-gray-100"
          onClick={() => setIsEditing(true)}
        >
          Chỉnh sửa trang cá nhân
        </Button>

        <Tabs defaultValue="threads" className="w-full mt-4">
          <TabsList className="flex w-full border-b">
            <TabsTrigger value="threads" className="flex-1 text-black">
              Thread
            </TabsTrigger>
            <TabsTrigger value="liked" className="flex-1 text-gray-400">
              Liked
            </TabsTrigger>
            <TabsTrigger value="reposts" className="flex-1 text-gray-400">
              Repost
            </TabsTrigger>
          </TabsList>

          <TabsContent value="threads">
            {/* Create Post Box */}
            <div className="flex items-center gap-2 my-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={avatar} alt="User Avatar" />
              </Avatar>

              <Dialog>
                <DialogTrigger asChild>
                  <div className="w-full border rounded-lg p-2 text-gray-500 cursor-text">
                    Bạn đang nghĩ gì
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <CreatePostDialog />
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>

          <TabsContent value="liked"></TabsContent>
          <TabsContent value="reposts"></TabsContent>
        </Tabs>
      </Card>

      {/* Hiển thị modal EditProfile khi isEditing = true */}
      {isEditing && (
        <EditProfile
          name={name}
          username={username}
          bio={bio}
          link={link}
          onSave={handleSaveProfile}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}
