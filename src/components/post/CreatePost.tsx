import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Image as PhotoIcon } from "lucide-react";
import { Hash, ListFilterPlus, X } from "lucide-react";

export default function CreatePostDialog() {
  const [post, setPost] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);
            setSelectedImages((prev) => [
              ...prev,
              event.target?.result as string,
            ]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <p className="font-bold p-1 text-center">Thread mới</p>

      <Textarea
        placeholder="Nhập nội dung bài viết..."
        className="w-full border rounded-lg p-2 mt-4"
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      {selectedImages.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative">
              <button
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-md"
                onClick={() => removeImage(index)}
              >
                <X size={18} />
              </button>
              <img
                src={image}
                alt={`Selected ${index}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-row items-center gap-2 mt-3">
        <p className="text-sm border-gray-300">Thêm vào bài viết của bạn:</p>

        <label className="flex items-center cursor-pointer gap-2 p-1 hover:bg-gray-200 rounded-full">
          <PhotoIcon className="w-5 h-5 text-gray-500" />
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        <label className="flex items-center cursor-pointer gap-2 p-1 hover:bg-gray-200 rounded-full">
          <Hash className="w-5 h-5 text-gray-500" />
        </label>

        <label className="flex items-center cursor-pointer gap-2 p-1 hover:bg-gray-200 rounded-full">
          <ListFilterPlus className="w-5 h-5 text-gray-500" />
        </label>
      </div>

      <div className="flex justify-end mt-4">
        <Button className="bg-blue-500 text-white">Đăng</Button>
      </div>
    </div>
  );
}
