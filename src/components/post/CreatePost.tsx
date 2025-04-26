import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { createPoll, createPost } from "@/services/post";
import { getMe } from "@/services/user";
import { Visibility } from "@/types/post";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart2,
  Clock,
  Hash,
  Image as PhotoIcon,
  PlusCircle,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  setOpen?: (open: boolean) => void;
  onPostCreated?: () => Promise<void>;
}

export default function CreatePostDialog({ setOpen, onPostCreated }: IProps) {
  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use TanStack Query to fetch user profile
  const { data: userProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getMe,
  });
  console.log(userProfile);
  // Poll related states
  const [isPollActive, setIsPollActive] = useState(false);
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const [pollDuration, setPollDuration] = useState(24); // duration in hours, default 24h

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Save the actual file objects for upload
    const newFiles = Array.from(files);
    setSelectedImages((prev) => [...prev, ...newFiles]);

    // Create previews
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result && typeof result === "string") {
          setPreviewImages((prev) => [...prev, result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, ""]);
    } else {
      toast.error("Tối đa 4 lựa chọn cho một cuộc thăm dò");
    }
  };

  const handleRemovePollOption = (index: number) => {
    if (pollOptions.length <= 2) {
      toast.error("Cần ít nhất 2 lựa chọn cho một cuộc thăm dò");
      return;
    }
    setPollOptions(pollOptions.filter((_, i) => i !== index));
  };

  const handleChangePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const validatePoll = () => {
    // Check if all poll options have content
    const emptyOptions = pollOptions.filter((option) => !option.trim());
    if (emptyOptions.length > 0) {
      toast.error(
        "Vui lòng điền nội dung cho tất cả các lựa chọn trong cuộc thăm dò"
      );
      return false;
    }

    // Check for duplicate options
    const uniqueOptions = new Set(pollOptions.map((o) => o.trim()));
    if (uniqueOptions.size !== pollOptions.length) {
      toast.error("Các lựa chọn trong cuộc thăm dò không được trùng nhau");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!content.trim() && selectedImages.length === 0) {
      toast.error("Vui lòng nhập nội dung hoặc thêm ảnh cho bài viết");
      return;
    }

    if (!userProfile) {
      toast.error("Bạn cần đăng nhập để đăng bài viết");
      return;
    }

    // Validate poll if active
    if (isPollActive && !validatePoll()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create base post data
      const postData = {
        creator_id: userProfile._id,
        content,
        visibility: Visibility.PUBLIC,
        hashtags: [],
        user_tags: [],
      };

      if (isPollActive) {
        // Calculate poll end time
        const endDate = new Date();
        endDate.setHours(endDate.getHours() + pollDuration);

        // Create poll data
        const pollData = {
          ...postData,
          poll: {
            poll_options: pollOptions.map((option) => ({
              content: option.trim(),
            })),
            end_at: endDate.toISOString(),
          },
        };

        // Call API to create poll post
        await createPoll(pollData);
        toast.success("Bài viết thăm dò ý kiến đã được đăng thành công!");
      } else {
        // Call the API to create normal post with files
        await createPost(
          postData,
          selectedImages.length > 0 ? selectedImages : undefined
        );
        toast.success("Bài viết đã được đăng thành công!");
      }

      // Reset form
      setContent("");
      setSelectedImages([]);
      setPreviewImages([]);
      setIsPollActive(false);
      setPollOptions(["", ""]);

      if (onPostCreated) {
        await onPostCreated();
      }

      // Close dialog automatically
      setOpen?.(false);
    } catch (error) {
      console.error("Lỗi khi đăng bài viết:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Đã xảy ra lỗi khi đăng bài viết. Vui lòng thử lại sau."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <DialogHeader className="text-left">
        <DialogTitle className="text-xl font-semibold text-center">
          Tạo Thread mới
        </DialogTitle>
      </DialogHeader>

      <div className="flex items-start gap-3 pt-2">
        <Avatar className="mt-1">
          <AvatarImage
            className="border border-gray-300 overflow-hidden rounded-full"
            src={userProfile?.avatar || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>
            {userProfile?.username?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-4">
          <Textarea
            placeholder="Bạn đang nghĩ gì?"
            className="w-full min-h-[120px] border rounded-lg p-3 text-base resize-none focus-visible:ring-primary"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Poll Section */}
          {isPollActive && (
            <div className="rounded-lg p-4 border border-gray-200 bg-slate-50/50 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-primary" />
                  <span>Tạo thăm dò ý kiến</span>
                </h3>
                <div className="flex items-center gap-2 bg-white rounded-md px-2 py-1 border">
                  <Clock className="h-4 w-4 text-primary" />
                  <select
                    id="poll-duration"
                    className="text-sm bg-transparent focus:outline-none"
                    value={pollDuration}
                    onChange={(e) => setPollDuration(Number(e.target.value))}
                  >
                    <option value={1}>1 giờ</option>
                    <option value={24}>1 ngày</option>
                    <option value={72}>3 ngày</option>
                    <option value={168}>1 tuần</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {pollOptions.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <Input
                      placeholder={`Lựa chọn ${index + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleChangePollOption(index, e.target.value)
                      }
                      className="flex-1 border-gray-300 focus-visible:ring-primary"
                    />
                    {index >= 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemovePollOption(index)}
                        className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {pollOptions.length < 4 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full flex items-center justify-center gap-1 border-dashed border-gray-300 hover:border-primary hover:text-primary bg-transparent"
                  onClick={handleAddPollOption}
                >
                  <PlusCircle size={16} />
                  <span>Thêm lựa chọn</span>
                </Button>
              )}
            </div>
          )}

          {/* Image Preview Section */}
          {!isPollActive && previewImages.length > 0 && (
            <div
              className={cn(
                "gap-2 mt-2 overflow-hidden rounded-lg",
                previewImages.length === 1
                  ? "grid grid-cols-1"
                  : previewImages.length === 2
                  ? "grid grid-cols-2 max-h-[240px]"
                  : previewImages.length >= 3
                  ? "grid grid-cols-3 max-h-[240px]"
                  : ""
              )}
            >
              {previewImages.map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-md group"
                >
                  <img
                    src={image}
                    alt={`Selected ${index}`}
                    className="w-full h-full object-cover aspect-square"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
                  <button
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={() => removeImage(index)}
                    type="button"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <span className="text-sm text-muted-foreground">Thêm:</span>

          <label
            className={cn(
              "flex items-center cursor-pointer gap-1 p-2 rounded-full hover:bg-slate-100",
              isPollActive && "opacity-50 cursor-not-allowed"
            )}
          >
            <PhotoIcon className="w-5 h-5 text-slate-600" />
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
              disabled={isPollActive}
            />
          </label>

          <Button variant="ghost" className="rounded-full w-9 h-9 p-0" disabled>
            <Hash className="w-5 h-5 text-slate-600" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Label
            htmlFor="poll-toggle"
            className="flex items-center gap-2 cursor-pointer text-sm"
          >
            <span>Thăm dò</span>
          </Label>
          <Switch
            id="poll-toggle"
            checked={isPollActive}
            onCheckedChange={(checked) => {
              if (checked && selectedImages.length > 0) {
                toast.error("Không thể tạo poll và đăng ảnh cùng lúc");
                return;
              }
              setIsPollActive(checked);
            }}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button variant="outline" type="button">
            Hủy
          </Button>
        </DialogClose>
        <Button
          variant="default"
          onClick={handleSubmit}
          disabled={isSubmitting}
          data-dialog-close
          type="button"
          className="bg-primary hover:bg-primary/90"
        >
          {isSubmitting ? "Đang đăng..." : "Đăng"}
        </Button>
      </div>
    </div>
  );
}
