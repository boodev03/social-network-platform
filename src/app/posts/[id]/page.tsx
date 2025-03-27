import PostDetail from "@/components/feed/PostDetail/PostDetail";

// This would typically come from an API call using the post ID
const samplePost = {
  id: 1,
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
};

export default function PostDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the post data using the ID
  // const post = await fetchPost(params.id);

  return (
    <div className="container max-w-2xl mx-auto">
      <PostDetail post={samplePost} />
    </div>
  );
}
