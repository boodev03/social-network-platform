import { Heart, MessageCircle, Repeat, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeedActionsProps {
  likes: number;
  comments: number;
  reposts: number;
  isLiked: boolean;
  onLike: () => void;
}

export function FeedActions({
  likes,
  comments,
  reposts,
  isLiked,
  onLike,
}: FeedActionsProps) {
  return (
    <div className="flex items-center -ml-2">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-9 w-9 text-muted-foreground hover:text-red-500",
          isLiked && "text-red-500"
        )}
        onClick={onLike}
      >
        <Heart
          size={18}
          className={cn(
            "transition-all duration-200 hover:scale-110 active:scale-90",
            isLiked && "fill-current"
          )}
        />
      </Button>
      <span className="min-w-[40px] text-sm text-muted-foreground">
        {likes > 0 ? likes : ""}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-muted-foreground hover:text-blue-500"
      >
        <MessageCircle
          size={18}
          className="transition-all duration-200 hover:scale-110 active:scale-90"
        />
      </Button>
      <span className="min-w-[40px] text-sm text-muted-foreground">
        {comments > 0 ? comments : ""}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-muted-foreground hover:text-green-500"
      >
        <Repeat
          size={18}
          className="transition-all duration-200 hover:scale-110 active:scale-90"
        />
      </Button>
      <span className="min-w-[40px] text-sm text-muted-foreground">
        {reposts > 0 ? reposts : ""}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-muted-foreground hover:text-primary ml-auto"
      >
        <Share
          size={18}
          className="transition-all duration-200 hover:scale-110 active:scale-90"
        />
      </Button>
    </div>
  );
}
