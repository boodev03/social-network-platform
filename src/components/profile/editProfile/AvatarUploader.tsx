import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface AvatarUploaderProps {
  avatar: string | null;
  onAvatarChange: (newAvatar: string | null) => void;
}

export default function AvatarUploader({
  avatar,
  // onAvatarChange,
}: AvatarUploaderProps) {
  const [showAvatarOptions, setShowAvatarOptions] = useState<boolean>(false);

  // const handleUploadAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       onAvatarChange(reader.result as string);
  //       setShowAvatarOptions(false);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleRemoveAvatar = () => {
  //   onAvatarChange("https://www.caythuocdangian.com/wp-content/uploads/anh-dai-dien-61.jpg");
  //   setShowAvatarOptions(false);
  // };

  const handleClose = () => setShowAvatarOptions(false);

  return (
    <div className="relative flex justify-end mr-9">
      {/* Avatar click để mở menu */}
      <div
        className="cursor-pointer"
        onClick={() => setShowAvatarOptions(!showAvatarOptions)}
      >
        <Avatar className="w-30 h-30 border border-gray-400">
          <AvatarImage src={avatar ?? undefined} alt="User Avatar" style={{ objectFit: "cover" }} />
        </Avatar>
      </div>

      {showAvatarOptions && (
        <>
          {/* Overlay để bắt sự kiện click ra ngoài */}
          <div
            className="fixed inset-0 z-40"
            onClick={handleClose} // Bấm ra ngoài thì đóng
          />

          {/* Menu avatar */}
          <div
            className="absolute left-0 top-full mt-2 w-[140px] bg-white border border-gray-300 p-2 rounded-lg shadow-md z-50"
            onClick={(e) => e.stopPropagation()} // Ngăn sự kiện lan ra ngoài
          >
            {/* Tải ảnh lên */}
            <label className="block text-xs w-full pl-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 text-left">
              Tải ảnh lên
              {/* <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUploadAvatar}
              /> */}
            </label>

            {/* Gỡ ảnh xuống */}
            <Button
              variant="ghost"
              className="block text-xs w-full pl-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 text-left"
            // onClick={handleRemoveAvatar}
            >
              Gỡ ảnh xuống
            </Button>

            {/* Đóng (màu đỏ) */}
            <Button
              variant="ghost"
              className="block text-xs w-full pl-3 py-2 rounded-md cursor-pointer text-red-500 hover:bg-gray-100 hover:text-red-500 text-left"
              onClick={handleClose}
            >
              Đóng
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
