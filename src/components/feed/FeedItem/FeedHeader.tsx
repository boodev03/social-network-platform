import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface FeedHeaderProps {
  avatar: string;
  username: string;
  date: Date;
}

export function FeedHeader({ avatar, username, date }: FeedHeaderProps) {
  // Format date to "over 1 year ago" style
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInYears = now.getFullYear() - date.getFullYear();

    if (diffInYears >= 1) {
      return `${diffInYears}y`;
    }

    const diffInMonths = now.getMonth() - date.getMonth() + 12 * diffInYears;
    if (diffInMonths >= 1) {
      return `${diffInMonths}m`;
    }

    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffInDays >= 1) {
      return `${diffInDays}d`;
    }

    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );
    if (diffInHours >= 1) {
      return `${diffInHours}h`;
    }

    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );
    return diffInMinutes <= 0 ? "now" : `${diffInMinutes}m`;
  };

  return (
    <div className="flex items-start space-x-3">
      <div className="relative group">
        <Avatar className="h-10 w-10 border-2 border-background group-hover:border-primary/10 transition-colors">
          <AvatarImage src={avatar} alt={`${username}'s avatar`} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-background"></div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm hover:text-primary hover:underline cursor-pointer transition-colors">
              {username}
            </span>
            <span className="text-muted-foreground/60 text-xs">·</span>
            <span className="text-muted-foreground/60 text-xs">
              {formatDate(date)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
