import { useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// import { Dialog, DialogContent } from "@/components/ui/dialog";

import CreatePostDialog from "../createPost/CreatePost";
import FeedItem from "./FeedItem";

import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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

    <div className="flex flex-col items-center min-h-screen text-black pt-4">
      <p className="font-bold p-4">Bảng tin</p>
      <Card className="w-full max-w-4xl rounded-xl shadow-lg">

        <div className="w-full h-full bg-background min-h-screen mt-2">
          {/* Create new post area */}
          {/* <div className="border-b border-border p-4">
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
          </div> */}

          <div className="flex items-center gap-2 p-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://randomuser.me/api/portraits/men/85.jpg" alt="User Avatar" />
            </Avatar>

            <Dialog>
              <DialogTrigger asChild>
                <div className="w-full border rounded-lg p-2 text-gray-500 cursor-text">
                  Bạn đang nghĩ gì
                </div>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[680px]">
                <CreatePostDialog />
              </DialogContent>
            </Dialog>
          </div>

          {/* Feed items */}
          <div className="divide-y divide-gray-300 border-t border-gray-300">
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
            <DialogContent className="sm:max-w-[680px]">
              <CreatePostDialog />
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  );
};

export default Feed;
