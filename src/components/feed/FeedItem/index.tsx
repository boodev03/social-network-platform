import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Post } from "@/types/post";
import { Poll } from "@/components/poll/Poll";
import { MediaRender } from "./MediaRender";
import { useAuth } from "@/providers/AuthProvider";
import { votePoll } from "@/services/post";
import { useState } from "react";
import { toast } from "sonner";

// Define the media item type to match MediaRender
interface MediaItem {
  key: string;
  url: string;
}

export default function FeedItem(post: Post) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pollData, setPollData] = useState(post);
  // Handle media click for fullscreen preview
  const handleMediaClick = (media: MediaItem, index: number) => {
    console.log(`Media clicked: ${media.url} at index ${index}`);
    // Implement fullscreen preview logic here if needed
  };

  const handleVote = async (optionId: string) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }
    if (!post._id) {
      console.error("Post ID is missing");
      return;
    }
    // 1. Lưu trạng thái hiện tại để khôi phục nếu thất bại
    const previousPollData = { ...pollData };

    // 2. Cập nhật UI ngay lập tức (optimistic)
    setPollData((current) => {
      if (!current.poll) return current;

      return {
        ...current,
        poll: {
          ...current.poll,
          poll_options: current.poll.poll_options.map((option) =>
            option._id === optionId
              ? { ...option, vote_count: option.vote_count + 1 }
              : option
          ),
        },
      };
    });

    try {
      // 3. Gọi API thực tế
      const response = await votePoll(post._id, optionId, user.id);
      if (response.success) {
        console.log("Vote successful");
      } else {
        console.error("Vote failed:", response.message);
        // 5. Khôi phục trạng thái nếu thất bại
        setPollData(previousPollData);
        toast.error("Không thể vote, vui lòng thử lại");
      }
    } catch (error) {
      console.error("Error voting on poll:", error);
      // 5. Khôi phục trạng thái nếu thất bại
      setPollData(previousPollData);
      toast.error("Không thể vote, vui lòng thử lại");
    }
  };

  return (
    <article className="w-full border border-gray-300 hover:bg-muted/30 transition-all duration-200 rounded-md overflow-hidden">
      <div className="p-4 md:p-5">
        {/* Header with user info and options */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={post.creator?.avatar}
                alt="User avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-background"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <span className="text-[10px] text-white">+</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="font-semibold text-sm">
                  {post.creator?.fullname || "Không có tên"}
                </p>
                <span className="text-xs text-muted-foreground">•</span>
                <p className="text-xs text-muted-foreground">
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleString("vi-VN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Không có thời gian"}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                @{post.creator?.username || "Không có username"}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <MoreHorizontal size={16} />
          </Button>
        </div>

        {/* Post content */}
        <div className="mb-3">
          <div className="whitespace-pre-wrap text-sm leading-relaxed mb-3">
            <p>{post.content}</p>

            {/* Display user tags if available */}
            {post.user_tags && post.user_tags.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1">
                {post.user_tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-primary font-medium hover:underline cursor-pointer"
                  >
                    @{tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Display hashtags if available */}
            {post.hashtags && post.hashtags.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1.5">
                {post.hashtags.map((hashtag) => (
                  <span
                    key={hashtag}
                    className="text-primary hover:underline cursor-pointer"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Media content using MediaRender component */}
          {post.urls && post.urls.length > 0 && (
            <MediaRender
              media={post.urls}
              onMediaClick={handleMediaClick}
              className="mt-3"
            />
          )}

          {/* Poll component */}
          {post.poll && pollData?.poll && (
            <div className="mt-4">
              <Poll
                options={pollData.poll.poll_options}
                endAt={pollData.poll.end_at}
                status={pollData.poll.status_poll}
                onVote={handleVote}
              />
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-4 pt-1">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 rounded-full h-9 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
          >
            <Heart size={18} />
            <span className="text-xs font-medium">{post.like_count || 0}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 rounded-full h-9 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            <MessageCircle size={18} />
            <span className="text-xs font-medium">
              {post.comment_count || 0}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 rounded-full h-9 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
          >
            <Repeat2 size={18} />
            <span className="text-xs font-medium">
              {post.qoute_post_count || 0}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 rounded-full h-9 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10 ml-auto"
          >
            <Share size={18} />
          </Button>
        </div>
      </div>
    </article>
  );
}
