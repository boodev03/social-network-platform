import PostDetail from "@/components/feed/PostDetail/PostDetail";

export default function PostDetailPage() {
  // In a real app, you would fetch the post data using the ID
  // const post = await fetchPost(params.id);

  return (
    <div className="container max-w-2xl mx-auto">
      <PostDetail />
    </div>
  );
}
