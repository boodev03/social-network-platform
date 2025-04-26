import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import CreatePostDialog from "../post/CreatePost";
import FeedItem from "./FeedItem";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/providers/AuthProvider";
import { getAllPosts } from "@/services/post";
import { Loader2 } from "lucide-react";

const Feed = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const { user } = useAuth();
  const observerTarget = useRef<HTMLDivElement>(null);

  // Use React Query for data fetching with infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getAllPosts(pageParam, 8);
      return {
        posts: response.data || [],
        nextPage: pageParam + 1,
        hasMore: response.data && response.data.length === 8,
      };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextPage : undefined;
    },
    initialPageParam: 1,
  });

  // Set up intersection observer to detect when user scrolls to bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // When the sentinel comes into view and we have more pages
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Flatten the posts from all pages
  const posts = data?.pages.flatMap((page) => page.posts) || [];

  const handlePostCreated = async () => {
    setIsCreatePostOpen(false);
    // Refetch the first page after creating a new post
    await refetch();
  };

  return (
    <div className="space-y-5">
      <Card className="p-4">
        <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
          <DialogTrigger asChild>
            <div className="flex gap-3 cursor-pointer">
              <Avatar>
                <AvatarImage
                  src={user?.avatar || "https://github.com/shadcn.png"}
                />
              </Avatar>
              <div className="flex-1 py-2 px-4 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground text-sm">
                Bạn đang nghĩ gì?
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <CreatePostDialog
              onPostCreated={handlePostCreated}
              setOpen={setIsCreatePostOpen}
            />
          </DialogContent>
        </Dialog>
      </Card>

      {status === "pending" ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : status === "error" ? (
        <div className="text-center py-10 text-destructive">
          {error instanceof Error
            ? error.message
            : "Không thể tải bài viết. Vui lòng thử lại sau."}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          Không có bài viết nào. Hãy là người đầu tiên đăng bài!
        </div>
      ) : (
        <>
          <div className="space-y-5">
            {posts.map((post) => (
              <FeedItem key={post._id || post.id} {...post} />
            ))}
          </div>

          {/* Intersection observer target element */}
          <div
            ref={observerTarget}
            className="h-8 flex items-center justify-center py-8"
          >
            {isFetchingNextPage && (
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Feed;
