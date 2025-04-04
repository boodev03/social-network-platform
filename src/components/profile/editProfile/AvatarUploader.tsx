import { useState } from "react";
import { Avatar, AvatarImage} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface AvatarUploaderProps {
  name: string;
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

  return (
    <div className="relative flex justify-end mr-9">
      <div
        className="cursor-pointer"
        onClick={() => setShowAvatarOptions(!showAvatarOptions)}
      >
        <Avatar className="w-16 h-16 border border-gray-400">
          <AvatarImage src={avatar ?? undefined} alt="User Avatar" style={{objectFit: "cover"}}/>
        </Avatar>
      </div>

      {showAvatarOptions && (
        <div className="absolute left-1/2 mt-17 transform -translate-x-1/2 mt-3 w-[140px] bg-white border border-gray-300 p-3 rounded-lg shadow-md z-50">
          <label className="text-xs w-full flex justify-center items-center px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100">
            Tải ảnh lên
            {/* <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUploadAvatar}
            /> */}
          </label>
          <Button
            variant="ghost"
            className="text-xs w-full text-left px-3 py-2 rounded-md hover:bg-gray-100"
            // onClick={handleRemoveAvatar}
          >
            Gỡ ảnh xuống
          </Button>
        </div>
      )}
    </div>
  );
}
