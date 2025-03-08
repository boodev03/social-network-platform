import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Repeat,
  Share,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface FeedItemProps {
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

const FeedItem = ({
  avatar,
  username,
  date,
  content,
  likes,
  comments,
  reposts,
  isLiked = false,
}: FeedItemProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeImagePreview = () => {
    setPreviewImage(null);
    // Re-enable scrolling
    document.body.style.overflow = "auto";
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

  // Format date to "over 1 year ago" style
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInYears = now.getFullYear() - date.getFullYear();

    if (diffInYears >= 1) {
      return `over ${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
    }

    const diffInMonths = now.getMonth() - date.getMonth() + 12 * diffInYears;
    if (diffInMonths >= 1) {
      return `over ${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    }

    return "recently";
  };

  // Extract YouTube video ID from URL
  const getYoutubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <>
      <article className="w-full border-b border-gray-200 hover:bg-gray-50/60 transition-all duration-300 ease-in-out">
        <div className="px-6 pt-4 pb-2">
          {/* Header with avatar and username */}
          <div className="flex items-start mb-3">
            <div className="mr-3 flex-shrink-0">
              <div className="relative group">
                <img
                  src={avatar}
                  alt={`${username}'s avatar`}
                  className="h-11 w-11 rounded-full object-cover shadow-sm ring-[2px] ring-white group-hover:ring-blue-50 transition-all duration-300"
                />
                <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <div>
                  <span className="font-bold text-gray-900 hover:text-blue-600 hover:underline cursor-pointer transition-colors duration-200 text-[15px]">
                    {username}
                  </span>
                  <div className="flex items-center mt-0.5">
                    <span className="text-gray-500 text-xs">
                      {formatDate(date)}
                    </span>
                  </div>
                </div>
                <button className="ml-auto text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Content: Text */}
          {content.text && (
            <div className="mb-3">
              <p className="text-gray-800 leading-relaxed text-[15px]">
                {content.text}
              </p>
            </div>
          )}

          {/* Content: Images */}
          {content.images && content.images.length > 0 && (
            <div
              className={`mb-3 ${
                content.images.length === 1 ? "" : "grid gap-2"
              } ${
                content.images.length === 2
                  ? "grid-cols-2"
                  : content.images.length === 3
                  ? "grid-cols-3"
                  : "grid-cols-2 grid-rows-2 gap-2"
              } rounded-xl overflow-hidden w-full`}
            >
              {content.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className={`relative ${
                    content.images && content.images.length === 1
                      ? "max-h-[400px]"
                      : content.images && content.images.length === 2
                      ? "h-52 sm:h-64"
                      : content.images && content.images.length === 3
                      ? "h-36 sm:h-48"
                      : "h-36 sm:h-44"
                  } overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:brightness-95`}
                  onClick={() => openImagePreview(image, index)}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Content: YouTube Video */}
          {content.youtubeUrl && (
            <div className="mb-3 relative pt-[56.25%] rounded-lg overflow-hidden shadow-sm w-full">
              <iframe
                src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                  content.youtubeUrl
                )}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg"
              ></iframe>
            </div>
          )}

          {/* Content: Regular Video */}
          {content.video && !content.youtubeUrl && (
            <div className="mb-3 relative pt-[56.25%] rounded-lg overflow-hidden shadow-sm w-full">
              <video
                src={content.video}
                controls
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                poster={
                  content.images && content.images.length > 0
                    ? content.images[0]
                    : undefined
                }
              />
            </div>
          )}
        </div>

        {/* Interaction buttons */}
        <div className="px-6 py-1.5 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center ${
                liked ? "text-red-500" : "text-gray-500"
              } hover:text-red-500 transition-colors duration-200 group`}
            >
              <span
                className={`p-0.5 rounded-full ${
                  liked ? "bg-red-50" : "group-hover:bg-red-50"
                } transition-colors duration-200`}
              >
                <Heart
                  size={16}
                  className={`${
                    liked ? "fill-current" : ""
                  } transition-transform duration-200 group-hover:scale-110 group-active:scale-90`}
                />
              </span>
              <span className="ml-1 text-xs font-medium">{likeCount}</span>
            </button>

            <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors duration-200 group">
              <span className="p-0.5 rounded-full group-hover:bg-blue-50 transition-colors duration-200">
                <MessageCircle
                  size={16}
                  className="transition-transform duration-200 group-hover:scale-110 group-active:scale-90"
                />
              </span>
              <span className="ml-1 text-xs font-medium">{comments}</span>
            </button>

            <button className="flex items-center text-gray-500 hover:text-green-500 transition-colors duration-200 group">
              <span className="p-0.5 rounded-full group-hover:bg-green-50 transition-colors duration-200">
                <Repeat
                  size={16}
                  className="transition-transform duration-200 group-hover:scale-110 group-active:scale-90"
                />
              </span>
              <span className="ml-1 text-xs font-medium">{reposts}</span>
            </button>
          </div>

          <button className="text-gray-500 hover:text-indigo-500 transition-colors duration-200 group">
            <span className="p-0.5 rounded-full group-hover:bg-indigo-50 transition-colors duration-200">
              <Share
                size={16}
                className="transition-transform duration-200 group-hover:scale-110 group-active:scale-90"
              />
            </span>
          </button>
        </div>
      </article>

      {/* Image Preview Modal */}
      {previewImage && content.images && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeImagePreview}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200 z-10"
              onClick={closeImagePreview}
            >
              <X size={24} />
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentImageIndex + 1} / {content.images.length}
            </div>

            {/* Previous button */}
            {currentImageIndex > 0 && (
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
                onClick={showPreviousImage}
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Next button */}
            {currentImageIndex < content.images.length - 1 && (
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
                onClick={showNextImage}
              >
                <ChevronRight size={28} />
              </button>
            )}

            {/* Image */}
            <img
              src={previewImage}
              alt={`Preview ${currentImageIndex + 1} of ${
                content.images.length
              }`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FeedItem;
