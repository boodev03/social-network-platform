import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import AvatarUploader from "./AvatarUploader";

interface EditProfileProps {
  name: string;
  username: string;
  bio: string;
  link: string;
  onSave: (bio: string, link: string, avatar?: string) => void;
  onClose: () => void;
}

export default function EditProfile({
  name,
  username,
  bio,
  link,
  onSave,
  onClose,
}: EditProfileProps) {
  const [newBio, setNewBio] = useState<string>(bio);
  const [newLink, setNewLink] = useState<string>(link);
  const [avatar, setAvatar] = useState<string | null>(
    "https://www.caythuocdangian.com/wp-content/uploads/anh-dai-dien-61.jpg"
  );
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState<boolean>(false);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[680px] w-full p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-2 items-center gap-3 border-b border-gray-400 pb-2">
          <div>
            <label className="text-xs text-gray-600">Tên</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-2 w-4 h-4 text-gray-500" />
              <Input
                value={`${name} (@${username})`}
                readOnly
                className="w-full text-sm text-gray-900 pl-7 py-1 border-none bg-transparent focus:ring-0"
              />
            </div>
          </div>

          {/* Avatar Uploader Component */}
          <AvatarUploader
            name={name}
            avatar={avatar}
            onAvatarChange={setAvatar}
          />
        </div>

        <div className="mt-3 border-b border-gray-400 pb-2">
          <label className="text-xs text-gray-600">Tiểu sử</label>
          <Textarea
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            className="text-sm h-12 border-none bg-transparent focus:ring-0"
            rows={2}
            placeholder="Viết gì đó..."
          />
        </div>

        <div className="mt-3 border-b border-gray-400 pb-2">
          <label className="text-xs text-gray-600">Liên kết</label>
          {isEditingLink ? (
            <Input
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="w-full mt-1 text-sm"
              placeholder="https://link-cua-ban.com"
            />
          ) : (
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm">{newLink || "Chưa có liên kết"}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingLink(true)}
              >
                Chỉnh sửa
              </Button>
            </div>
          )}
        </div>

        {showLinkModal && (
          <Dialog
            open={showLinkModal}
            onOpenChange={() => setShowLinkModal(false)}
          >
            <DialogContent className="max-w-[300px] p-4">
              <label className="text-xs text-gray-600">Nhập liên kết</label>
              <Input
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                className="text-sm border-gray-300"
                placeholder="https://your-link.com"
              />
              <div className="flex justify-end mt-2 gap-2">
                <Button
                  variant="ghost"
                  className="hover:bg-gray-100 px-3 py-1 rounded-md"
                  onClick={() => setShowLinkModal(false)}
                >
                  Hủy
                </Button>
                <Button
                  className="bg-black text-white hover:bg-gray-800 px-3 py-1 rounded-md"
                  onClick={() => setShowLinkModal(false)}
                >
                  Lưu
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        <Button
          className="w-full mt-3 bg-black text-white text-sm py-2 hover:bg-gray-800"
          onClick={() => {
            onSave(newBio, newLink, avatar ?? "");
            onClose();
          }}
        >
          Lưu
        </Button>
      </DialogContent>
    </Dialog>
  );
}
