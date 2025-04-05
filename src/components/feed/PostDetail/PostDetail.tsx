import { useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { FeedContent } from "../FeedItem/FeedContent";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface Comment {
  id: number;
  avatar: string;
  username: string;
  date: Date;
  content: string;
  likes: number;
  replies: number;
  isLiked: boolean;
}

// This would typically come from an API call
const samplePosts = [
  {
    id: "1",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    username: "Sarah Johnson",
    date: new Date(2022, 5, 15),
    content: {
      text: "Just finished my latest design project! 🎨 So excited to share it with everyone. What do you think?",
      images: [
        "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      ],
    },
    likes: 42,
    comments: 8,
    reposts: 3,
    isLiked: true,
  },
  {
    id: "2",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "Mike Chen",
    date: new Date(2022, 5, 14),
    content: {
      text: "Check out this amazing sunset! 🌅",
      images: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      ],
    },
    likes: 28,
    comments: 5,
    reposts: 2,
    isLiked: false,
  },
  {
    id: "3",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    username: "Emma Wilson",
    date: new Date(2022, 5, 13),
    content: {
      text: "Just launched my new website! 🚀 Check it out and let me know what you think.",
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      ],
    },
    likes: 56,
    comments: 12,
    reposts: 4,
    isLiked: false,
  },
];

const sampleComments: Comment[] = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    username: "Emily Chen",
    date: new Date(2024, 2, 15),
    content: "This is amazing! Love the design 😍",
    likes: 12,
    replies: 2,
    isLiked: false,
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    username: "Michael Brown",
    date: new Date(2024, 2, 14),
    content: "Great work! Can you share more details about the process?",
    likes: 8,
    replies: 1,
    isLiked: true,
  },
];

const PostDetail = () => {
  const { id } = useParams();
  const post = samplePosts.find((p) => p.id === id) || samplePosts[0];
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: comments.length + 1,
      avatar: "https://randomuser.me/api/portraits/men/85.jpg", // Current user's avatar
      username: "Current User", // Current user's name
      date: new Date(),
      content: newComment,
      likes: 0,
      replies: 0,
      isLiked: false,
    };

    setComments([newCommentObj, ...comments]);
    setNewComment("");
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
    if (
      post.content.images &&
      currentImageIndex < post.content.images.length - 1
    ) {
      setCurrentImageIndex(currentImageIndex + 1);
      setPreviewImage(post.content.images[currentImageIndex + 1]);
    }
  };

  const showPreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (post.content.images && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      setPreviewImage(post.content.images[currentImageIndex - 1]);
    }
  };

  const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng

  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-black p-4">
      {/* Thêm icon quay lại */}
      <div className="flex items-center gap-3 p-4">
        <button onClick={handleGoBack} className="text-primary">
          <ChevronLeft size={24} />
        </button>
        <p className="font-bold">Thread trả lời</p>
      </div>
      <Card className="w-full max-w-4xl rounded-xl shadow-lg pt-2">
        <Layout>
          {/* <div className="container max-w-2xl mx-auto"> */}
          <div className="flex flex-col h-full bg-background">
            {/* Main post */}
            <div className="p-4 border-b border-border">
              <div className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11 ring-2 ring-background">
                    <AvatarImage src={post.avatar} alt={post.username} />
                    <AvatarFallback>{post.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{post.username}</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(post.date, { addSuffix: true })}
                    </span>
                  </div>
                </div>
                <FeedContent
                  content={post.content}
                  onImageClick={openImagePreview}
                />
                <div className="flex items-center gap-6 mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
                    onClick={handleLike}
                  >
                    <Heart
                      className={isLiked ? "fill-primary text-primary" : ""}
                      size={18}
                    />
                    <span className="text-sm">{likesCount}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
                  >
                    <MessageCircle size={18} />
                    <span className="text-sm">{post.comments}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
                  >
                    <Repeat2 size={18} />
                    <span className="text-sm">{post.reposts}</span>
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
              {/* </div> */}
            </div>

            {/* Comment input */}
            <form
              onSubmit={handleCommentSubmit}
              className="p-4 border-b border-border"
            >
              <div className="flex gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-background">
                  <AvatarImage
                    src="https://randomuser.me/api/portraits/men/85.jpg"
                    alt="Your avatar"
                  />
                  <AvatarFallback>YA</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="bg-muted/60"
                  />
                </div>
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  disabled={!newComment.trim()}
                >
                  Reply
                </Button>
              </div>
            </form>

            {/* Comments list */}
            <ScrollArea className="flex-1">
              <div className="divide-y divide-border">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 ring-2 ring-background">
                        <AvatarImage
                          src={comment.avatar}
                          alt={comment.username}
                        />
                        <AvatarFallback>{comment.username[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {comment.username}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {formatDistanceToNow(comment.date, {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <p className="mt-1 text-sm">{comment.content}</p>
                        <div className="flex items-center gap-6 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
                          >
                            <Heart
                              className={
                                comment.isLiked ? "fill-primary text-primary" : ""
                              }
                              size={16}
                            />
                            <span className="text-sm">{comment.likes}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
                          >
                            <MessageCircle size={16} />
                            <span className="text-sm">{comment.replies}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Image Preview */}
            {post.content.images && (
              <div
                className={`fixed inset-0 bg-black/80 z-50 flex items-center justify-center ${previewImage ? "opacity-100" : "opacity-0 pointer-events-none"
                  } transition-opacity duration-200`}
                onClick={closeImagePreview}
              >
                <div className="relative max-w-4xl w-full mx-4">
                  <button
                    className="absolute -top-12 right-0 text-white hover:text-gray-300"
                    onClick={closeImagePreview}
                  >
                    Close
                  </button>
                  <div className="relative aspect-square">
                    <img
                      src={previewImage || ""}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                    {post.content.images.length > 1 && (
                      <>
                        <button
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                          onClick={showPreviousImage}
                          disabled={currentImageIndex === 0}
                        >
                          Previous
                        </button>
                        <button
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                          onClick={showNextImage}
                          disabled={
                            currentImageIndex === post.content.images.length - 1
                          }
                        >
                          Next
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* </div> */}
        </Layout>
      </Card>
    </div>
  );
};

export default PostDetail;
