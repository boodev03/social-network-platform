import { cn } from "@/lib/utils";
import { Maximize } from "lucide-react";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";
import Viewer from "react-viewer";

interface MediaItem {
  key: string;
  url: string;
}

interface MediaRenderProps {
  media: MediaItem[];
  onMediaClick?: (media: MediaItem, index: number) => void;
  className?: string;
}

// Function to determine media type
const getMediaType = (url: string) => {
  // Video file extensions
  if (/\.(mp4|webm|ogg|mov)$/i.test(url)) {
    return "video";
  }

  // YouTube, Vimeo, and other supported services by react-player
  if (ReactPlayer.canPlay(url)) {
    return "streaming";
  }

  // Default to image
  return "image";
};

export const MediaRender = ({
  media,
  onMediaClick,
  className,
}: MediaRenderProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  if (!media || media.length === 0) return null;

  // Prepare images for viewer
  const viewerImages = media
    .filter((item) => getMediaType(item.url) === "image")
    .map((item) => ({ src: item.url, alt: "Post image" }));

  const handleMediaClick = (item: MediaItem, index: number) => {
    const mediaType = getMediaType(item.url);

    if (mediaType === "image") {
      // Find the index in viewerImages for this image
      const imageIndex = media
        .filter((m) => getMediaType(m.url) === "image")
        .findIndex((m) => m.key === item.key);

      if (imageIndex >= 0) {
        setActiveIndex(imageIndex);
        setIsViewerOpen(true);
      }
    } else if (mediaType === "video" || mediaType === "streaming") {
      // Toggle video playback
      setPlayingVideo(playingVideo === index ? null : index);
    }

    // Call the parent handler if provided
    if (onMediaClick) {
      onMediaClick(item, index);
    }
  };

  return (
    <>
      <div
        className={cn(
          "mt-3 rounded-xl overflow-hidden",
          media.length === 1
            ? "grid grid-cols-1"
            : media.length === 2
            ? "grid grid-cols-2 gap-0.5"
            : media.length === 3
            ? "grid grid-cols-2 gap-0.5"
            : "grid grid-cols-2 gap-0.5",
          className
        )}
      >
        {media.map((item, index) => {
          const mediaType = getMediaType(item.url);

          return (
            <div
              key={item.key || index}
              className={cn(
                "relative overflow-hidden group cursor-pointer",
                media.length === 1
                  ? "max-h-96 rounded-xl"
                  : media.length === 3 && index === 0
                  ? "row-span-2 h-full"
                  : "h-48"
              )}
              onClick={() => handleMediaClick(item, index)}
            >
              {mediaType === "image" && (
                <>
                  <img
                    src={item.url}
                    alt={`Media ${index}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-black/50 p-2 rounded-full">
                      <Maximize className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </>
              )}

              {(mediaType === "video" || mediaType === "streaming") && (
                <div className="w-full h-full">
                  <ReactPlayer
                    url={item.url}
                    width="100%"
                    height="100%"
                    playing={true}
                    controls={true}
                    light={false}
                    pip={true}
                    stopOnUnmount={true}
                    config={{
                      youtube: {
                        playerVars: { showinfo: 1 },
                      },
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Image viewer for fullscreen preview */}
      <Viewer
        visible={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        images={viewerImages}
        activeIndex={activeIndex}
        zIndex={9999}
        scalable={true}
        zoomable={true}
        rotatable={true}
        downloadable={true}
        noImgDetails={false}
        onChange={(_, index: number) => setActiveIndex(index)}
      />
    </>
  );
};
