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

// Define the media item type to match MediaRender
interface MediaItem {
  key: string;
  url: string;
}

export default function FeedItem(post: Post) {
  const navigate = useNavigate();

  // Handle media click for fullscreen preview
  const handleMediaClick = (media: MediaItem, index: number) => {
    console.log(`Media clicked: ${media.url} at index ${index}`);
    // Implement fullscreen preview logic here if needed
  };

  return (
    <article className="w-full border border-gray-300 hover:bg-muted/30 transition-all duration-200 rounded-md overflow-hidden">
      <div className="p-4 md:p-5">
        {/* Header with user info and options */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/men/85.jpg"
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
          <p className="whitespace-pre-wrap text-sm leading-relaxed mb-3">
            {post.content}
          </p>

          {/* Media content using MediaRender component */}
          {post.urls && post.urls.length > 0 && (
            <MediaRender
              media={post.urls}
              onMediaClick={handleMediaClick}
              className="mt-3"
            />
          )}

          {/* Poll component */}
          {post.poll && (
            <div className="mt-4">
              <Poll
                options={post.poll.poll_options}
                endAt={post.poll.end_at}
                status={post.poll.status_poll}
                onVote={async (optionId) => {
                  console.log(`Voted for option: ${optionId}`);
                  // Implement voting API call here
                  return Promise.resolve();
                }}
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
