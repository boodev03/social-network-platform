import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CreatePostDialog from "../createPost/CreatePost";
import FeedItem from "./FeedItem";

// Sample data for demonstration
const sampleFeedData = [
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

const Feed = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const feedItems = sampleFeedData;

  return (
    <div className="w-full h-full bg-background min-h-screen border-x">
      {/* Create new post area */}
      <div className="border-b border-border p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-background">
            <AvatarImage
              src="https://randomuser.me/api/portraits/men/85.jpg"
              alt="Your avatar"
            />
            <AvatarFallback>YA</AvatarFallback>
          </Avatar>

          <div
            className="flex-1 cursor-pointer"
            onClick={() => setIsCreatePostOpen(true)}
          >
            <div className="w-full rounded-full bg-muted/60 hover:bg-muted px-4 py-2.5 text-sm text-muted-foreground">
              What's happening?
            </div>
          </div>
        </div>
      </div>

      {/* Feed items */}
      <div className="divide-y divide-border">
        {feedItems.map((item) => (
          <FeedItem
            id={item.id}
            key={item.id}
            avatar={item.avatar}
            username={item.username}
            date={item.date}
            content={item.content}
            likes={item.likes}
            comments={item.comments}
            reposts={item.reposts}
            isLiked={item.isLiked}
          />
        ))}
      </div>

      {/* Create Post Dialog */}
      <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <CreatePostDialog />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Feed;
