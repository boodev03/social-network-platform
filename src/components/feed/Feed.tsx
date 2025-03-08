import FeedItem from "./FeedItem";

// Sample data for demonstration
const sampleFeedData = [
  {
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
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "Alex Chen",
    date: new Date(2022, 5, 10),
    content: {
      text: "Check out this amazing view from my morning hike! 🏞️ #nature #adventure",
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      ],
    },
    likes: 128,
    comments: 24,
    reposts: 12,
    isLiked: false,
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    username: "Maya Patel",
    date: new Date(2022, 5, 5),
    content: {
      text: "Our team just launched the new product! 🚀 Months of hard work finally paying off. So proud of everyone involved!",
      youtubeUrl: "https://www.youtube.com/watch?v=qsdikjJmg08",
    },
    likes: 89,
    comments: 15,
    reposts: 7,
    isLiked: false,
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    username: "David Wilson",
    date: new Date(2022, 4, 28),
    content: {
      text: "Just watched this amazing tutorial on web development. Highly recommend! 💻",
      youtubeUrl: "https://www.youtube.com/watch?v=ZbpcxBc76rA",
    },
    likes: 65,
    comments: 9,
    reposts: 5,
    isLiked: true,
  },
];

const Feed = () => {
  // Using the feedItems directly without state since we're not modifying it in this example
  const feedItems = sampleFeedData;

  return (
    <div className="w-full h-full bg-white min-h-screen border-x border-gray-200 shadow-md">
      {/* Create new post area */}
      <div className="border-b border-gray-200 px-4 py-4">
        <div className="flex">
          <div className="mr-3">
            <img
              src="https://randomuser.me/api/portraits/men/85.jpg"
              alt="Your avatar"
              className="h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-white"
            />
          </div>

          <div className="flex-1">
            <input
              type="text"
              placeholder="What's happening?"
              className="w-full bg-transparent border-none outline-none text-gray-800 text-sm placeholder:text-gray-400"
            />

            <div className="flex justify-end mt-3">
              <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-5 py-1.5 rounded-full text-sm font-medium shadow-sm transition-all duration-200 hover:shadow">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed items */}
      <div>
        {feedItems.map((item) => (
          <FeedItem
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
    </div>
  );
};

export default Feed;
