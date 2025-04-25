import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateProfileWithFormData } from "@/services/user";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

interface EditProfileProps {
  username: string;
  fullname: string;
  avatar: string;
  bio: string;
  link: string;
  onClose: () => void;
  onUpdate: () => void;
}

export default function EditProfile({
  username,
  fullname,
  avatar,
  bio,
  link,
  onClose,
  onUpdate,
}: EditProfileProps) {
  const [newName, setNewName] = useState<string>(fullname);
  const [newBio, setNewBio] = useState<string>(bio);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [newLink, setNewLink] = useState<string>(link);

  const [error, setError] = useState<string | null>(null);

  const isChanged = () => {
    return newName !== fullname || newBio !== bio || newLink !== link || newAvatar !== null;
  }

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();

      if (!newName.trim()) {
        setError("Tên không được để trống");
        return;
      }

      if (newName !== fullname) {
        formData.append("fullname", newName.trim());
      }
      
      if (newBio !== bio) {
        formData.append("bio", newBio?.trim() || "");
      }
      
      if (newLink !== link) {
        formData.append("link", newLink?.trim() || "");
      }

      if (newAvatar) {
        formData.append("file", newAvatar);
        console.log(newAvatar)
      }

      const response = await updateProfileWithFormData(formData);
      console.log(response);

      toast.success("Cập nhật hồ sơ thành công!");
      onUpdate();  // cập nhật lại profile
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Cập nhật thất bại. Vui lòng thử lại sau.");
      setError("Cập nhật thông tin thất bại. Vui lòng thử lại.");
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Vui lòng chọn một file ảnh.");
        return;
      }
      if (file.size > 5000000) {
        setError("File ảnh quá lớn. Vui lòng chọn ảnh nhỏ hơn 5MB.");
        return;
      }

      setNewAvatar(file);
      event.target.value = "";
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[680px] w-full p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          {/* Left side with flex-1 */}
          <div className="flex flex-col gap-2 flex-1">
            <p className="text-sm text-gray-500 mt-2">@{username}</p>
            <div className="border-b border-gray-400 pb-2">
              <label className="text-xs text-gray-600">Tên</label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full text-sm text-gray-900 py-1 border-none bg-transparent focus:ring-0"
              />
            </div>
          </div>

          {/* Avatar uploader */}
          <div className="relative ml-4 mr-10 shrink-0">
            <img
              key={newAvatar ? URL.createObjectURL(newAvatar) : avatar}
              src={newAvatar ? URL.createObjectURL(newAvatar) : avatar || "/default-avatar.png"}
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover border"
            />
            <label className="absolute bottom-0 right-0 bg-white border rounded-full p-1 cursor-pointer hover:bg-gray-100 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <span className="text-xs text-gray-700">
                <Pencil size={14} />
              </span>
            </label>
          </div>
        </div>

        {/* Tiểu sử */}
        <div className="mt-3 border-b border-gray-400 pb-2">
          <label className="text-xs text-gray-600">Tiểu sử</label>
          <Textarea
            value={newBio || ""}
            onChange={(e) => setNewBio(e.target.value)}
            className="text-sm h-12 border-none bg-transparent focus:ring-0"
            rows={2}
            placeholder="Viết gì đó..."
          />
        </div>

        {/* Liên kết */}
        <div className="mt-3 border-b border-gray-400 pb-2">
          <label className="text-xs text-gray-600">Liên kết</label>
          <Textarea
            value={newLink || ""}
            onChange={(e) => setNewLink(e.target.value)}
            className="text-sm h-12 border-none bg-transparent focus:ring-0"
            rows={2}
            placeholder="https://link-cua-ban.com"
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

        <Button
          className="w-full mt-3 bg-black text-white text-sm py-2 hover:bg-gray-800"
          onClick={handleUpdateProfile}
          disabled={!isChanged()}
        >
          Lưu
        </Button>
      </DialogContent>
    </Dialog>
  );
}
