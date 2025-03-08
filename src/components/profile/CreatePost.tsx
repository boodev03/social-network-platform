import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CreatePostDialog() {
  const [post, setPost] = useState("");

  return (
    <div className="flex items-center gap-2 mt-4">
      <Avatar className="w-10 h-10">
        <AvatarImage src="https://example.com/avatar.jpg" alt="User Avatar" />
        <AvatarFallback>HT</AvatarFallback>
      </Avatar>

      <Dialog>
        <DialogTrigger asChild>
          <div className="w-full border rounded-lg p-2 text-gray-500 cursor-text">
            Có gì mới?
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tạo bài viết</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Nhập nội dung bài viết..."
            className="w-full border rounded-lg p-2"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
          <DialogFooter>
            <Button className="bg-blue-500 text-white">Đăng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
