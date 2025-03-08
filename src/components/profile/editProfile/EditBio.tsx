"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditBio() {
  const [bio, setBio] = useState(
    "Cứ dịu dàng, cứ chân thành vui vẻ\nCứ yêu đời, đời cũng sẽ yêu ta."
  );
  const [tempBio, setTempBio] = useState(bio);
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    setBio(tempBio);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Chỉnh sửa tiểu sử</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-full bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center pb-2 border-b">
          <ArrowLeft
            className="w-5 h-5 cursor-pointer"
            onClick={() => setOpen(false)}
          />
          <h2 className="text-lg font-bold">Chỉnh sửa tiểu sử</h2>
          <Button
            variant="ghost"
            className="text-blue-500"
            onClick={handleSave}
          >
            Xong
          </Button>
        </div>

        <Textarea
          className="mt-3 w-full border border-gray-300 rounded-md p-2"
          value={tempBio}
          onChange={(e) => setTempBio(e.target.value)}
          placeholder="Nhập tiểu sử của bạn..."
        />

        <p className="text-xs text-gray-500 text-center mt-2">
          Tiểu sử của bạn hiển thị công khai.
        </p>
      </DialogContent>
    </Dialog>
  );
}
