interface FeedContentProps {
  content: {
    text?: string;
    images?: string[];
    video?: string;
    youtubeUrl?: string;
  };
  onImageClick: (image: string, index: number) => void;
}

export function FeedContent({ content, onImageClick }: FeedContentProps) {
  // Extract YouTube video ID from URL
  const getYoutubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="space-y-3">
      {/* Text content */}
      {content.text && (
        <p className="text-[15px] leading-normal text-foreground">
          {content.text}
        </p>
      )}

      {/* Images grid */}
      {content.images && content.images.length > 0 && (
        <div
          className={`${content.images.length === 1 ? "" : "grid gap-0.5"} ${
            content.images.length === 2
              ? "grid-cols-2"
              : content.images.length === 3
              ? "grid-cols-2"
              : "grid-cols-2"
          } rounded-xl overflow-hidden w-full ${
            content.images.length === 3 ? "grid-rows-2" : ""
          }`}
        >
          {content.images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className={`relative ${
                content.images && content.images.length === 1
                  ? "max-h-[480px]"
                  : content.images && content.images.length === 2
                  ? "h-64"
                  : content.images && content.images.length === 3
                  ? index === 0
                    ? "row-span-2 h-full"
                    : "h-32"
                  : "h-48"
              } ${
                content.images && content.images.length === 3 && index === 0
                  ? "row-span-2"
                  : ""
              } overflow-hidden cursor-pointer transition-all duration-200 hover:opacity-90`}
              onClick={() => onImageClick(image, index)}
            >
              <img
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* YouTube Video */}
      {content.youtubeUrl && (
        <div className="relative pt-[56.25%] rounded-xl overflow-hidden w-full bg-muted">
          <iframe
            src={`https://www.youtube.com/embed/${getYoutubeVideoId(
              content.youtubeUrl
            )}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      )}

      {/* Regular Video */}
      {content.video && !content.youtubeUrl && (
        <div className="relative pt-[56.25%] rounded-xl overflow-hidden w-full bg-muted">
          <video
            src={content.video}
            controls
            className="absolute top-0 left-0 w-full h-full object-cover"
            poster={content.images?.[0]}
          />
        </div>
      )}
    </div>
  );
}
