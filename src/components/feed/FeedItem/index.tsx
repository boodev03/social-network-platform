import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FeedContent } from "./FeedContent";
import { FeedHeader } from "./FeedHeader";
import { ImagePreview } from "./ImagePreview";

interface FeedItemProps {
  id: string;
  avatar: string;
  username: string;
  date: Date;
  content: {
    text?: string;
    images?: string[];
    video?: string;
    youtubeUrl?: string;
  };
  likes: number;
  comments: number;
  reposts: number;
  isLiked?: boolean;
}

export default function FeedItem({
  avatar,
  username,
  date,
  content,
  likes,
  comments,
  reposts,
  isLiked = false,
  id,
}: FeedItemProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const openImagePreview = (image: string, index: number) => {
    setPreviewImage(image);
    setCurrentImageIndex(index);
  };

  const closeImagePreview = () => {
    setPreviewImage(null);
  };

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (content.images && currentImageIndex < content.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setPreviewImage(content.images[currentImageIndex + 1]);
    }
  };

  const showPreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (content.images && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      setPreviewImage(content.images[currentImageIndex - 1]);
    }
  };

  const handleCommentClick = () => {
    navigate(`/posts/${id}`);
  };

  return (
    <article className="w-full hover:bg-muted/50 transition-colors">
      <div className="px-4 py-3 space-y-3">
        <FeedHeader avatar={avatar} username={username} date={date} />

        <FeedContent content={content} onImageClick={openImagePreview} />

        <div className="flex items-center gap-6 mt-3">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
            onClick={handleLike}
          >
            <Heart
              className={liked ? "fill-primary text-primary" : ""}
              size={18}
            />
            <span className="text-sm">{likeCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
            onClick={handleCommentClick}
          >
            <MessageCircle size={18} />
            <span className="text-sm">{comments}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
          >
            <Repeat2 size={18} />
            <span className="text-sm">{reposts}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
          >
            <Share size={18} />
          </Button>
        </div>
      </div>

      {content.images && (
        <ImagePreview
          images={content.images}
          currentIndex={currentImageIndex}
          isOpen={!!previewImage}
          onClose={closeImagePreview}
          onPrevious={showPreviousImage}
          onNext={showNextImage}
        />
      )}
    </article>
  );
}
