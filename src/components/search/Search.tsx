import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X as ClearIcon, Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { searchUsers } from "@/services/search";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Khai báo kiểu dữ liệu cho User
interface User {
  _id: string;
  avatar?: string;
  username?: string;
  fullname?: string;
  bio?: string | null;
  link?: string | null;
}

// Cập nhật interface Post
interface Post {
  _id: string;
  content: string;
  creator_id: string;
  hashtags: string[];
  createdAt: string;
  like_count: number;
  comment_count: number;
  quote_post_count: number;
  urls: {
    key: string;
    url: string;
  }[];
  creator: {
    _id: string;
    username: string;
    fullname: string;
    avatar: string;
  };
}

// Thêm interface Hashtag
interface HastagItem {
  tag: string;
  count: number;
}

// Component hiển thị danh sách users
const UserList = ({ users, isLoading, hasMore }: { users: User[], isLoading: boolean, hasMore: boolean }) => (
  <div>
    {users.map((user, index) => (
      <div
        key={user._id}
        className="flex items-center justify-between border-b border-gray-300 py-2"
      >
        <div className="flex items-start gap-3">
          <img
            src={user.avatar}
            alt={user.username}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{user.username}</p>
            <p className="text-sm text-gray-500">{user.fullname}</p>
          </div>
        </div>

        <Button
          variant="outline"
          className="bg-white text-black border-gray-750 hover:bg-gray-100 px-4 py-1"
        >
          Theo dõi
        </Button>
      </div>
    ))}
    {isLoading && users.length > 0 && (
      <p className="text-center text-gray-500 mt-4">Đang tải thêm...</p>
    )}
    {!hasMore && users.length > 0 && (
      <p className="text-center text-gray-500 mt-4">Không còn người dùng.</p>
    )}
  </div>
);

// Component hiển thị danh sách posts
const PostList = ({ posts }: { posts: Post[] }) => (
  <div className="space-y-4">
    {[...posts]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((post) => (
        <div key={post._id} className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={post.creator.avatar}
              alt={post.creator.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{post.creator.username}</p>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          <p className="text-[15px] mb-3">{post.content}</p>
          {post.urls.length > 0 && (
            <div className={`grid ${post.urls.length === 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-2 mb-3`}>
              {post.urls.map((image) => (
                <img 
                  key={image.key} 
                  src={image.url} 
                  alt="post" 
                  className="w-full h-auto rounded-lg"
                />
              ))}
            </div>
          )}

          {post.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.hashtags.map((tag, index) => (
                <span key={index} className="text-blue-500 text-sm hover:underline cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
            >
              <Heart className="w-[18px] h-[18px]" />
              <span className="text-sm">{post.like_count}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
            >
              <MessageCircle className="w-[18px] h-[18px]" />
              <span className="text-sm">{post.comment_count}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
            >
              <Repeat2 className="w-[18px] h-[18px]" />
              <span className="text-sm">{post.quote_post_count}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
            >
              <Share className="w-[18px] h-[18px]" />
            </Button>
          </div>
        </div>
      ))}
  </div>
);

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchText, setSearchText] = useState(searchParams.get('text') || "");
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || "1"));
  const itemsLimit = parseInt(searchParams.get('limit') || "3");

  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hashtags, setHashtags] = useState<HastagItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  const updateSearchParams = (newText?: string, newPage?: number) => {
    const params = new URLSearchParams();
    if (newText) params.set('text', newText);
    if (newPage) params.set('page', newPage.toString());
    params.set('limit', itemsLimit.toString());
    setSearchParams(params);
  };

  const fetchUsers = async (isNewSearch = false) => {
    if (isLoading || (!hasMore && !isNewSearch)) return;

    setIsLoading(true);
    setError("");
    setHasSearched(true);

    const pageToFetch = isNewSearch ? 1 : currentPage;

    try {
      // Update URL parameters without page reload
      updateSearchParams(searchText, pageToFetch);

      const response = await searchUsers(searchText, pageToFetch, itemsLimit);

      console.log(response)


      if (response.status) {
        // Cập nhật users
        const newUsers = response.data.users.items;
        setUsers((prevUsers) =>
          isNewSearch ? newUsers : [...prevUsers, ...newUsers]
        );

        // Cập nhật posts
        const newPosts = response.data.posts.items;
        setPosts((prevPosts) =>
          isNewSearch ? newPosts : [...prevPosts, ...newPosts]
        );

        // Xử lý và cập nhật hashtags với type safety
        if (isNewSearch && Array.isArray(newPosts)) {
          const hashtagMap = new Map<string, number>();
          newPosts.forEach((post: Post) => {
            if (Array.isArray(post.hashtags)) {
              post.hashtags.forEach((tag: string) => {
                hashtagMap.set(tag, (hashtagMap.get(tag) || 0) + 1);
              });
            }
          });

          const hashtagArray: HastagItem[] = Array.from(hashtagMap.entries())
            .map(([tag, count]): HastagItem => ({
              tag,
              count
            }));

          setHashtags(hashtagArray);
        }

        setCurrentPage((prevPage) => (isNewSearch ? 2 : prevPage + 1));
        setHasMore(newUsers.length === itemsLimit);
      } else {
        setHasMore(false);
        if (isNewSearch) {
          setUsers([]);
          setPosts([]);
          setHashtags([]);
        }
      }
    } catch (err) {
      console.error("Lỗi khi tìm kiếm:", err);
      setError("Thông tin tìm kiếm không tồn tại");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchUsers(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        hasMore &&
        !isLoading
      ) {
        fetchUsers();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading]);

  // Load initial search if URL has parameters
  useEffect(() => {
    if (searchParams.get('text')) {
      fetchUsers(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-black p-4">
      <p className="font-bold p-4">Tìm kiếm</p>
      <Card className="w-full max-w-4xl p-4 rounded-xl shadow-lg">
        <div className="flex items-center space-x-2 relative w-full">
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-10 w-full"
          />
          <button
            className="absolute right-4 p-1 text-gray-500 hover:text-gray-700"
            onClick={() => {
              setSearchText("");
              setUsers([]);
              setPosts([]);
              setHashtags([]);
              setCurrentPage(1);
              setHasMore(true);
              setHasSearched(false);
            }}
          >
            {searchText ? <ClearIcon size={18} /> : <SearchIcon size={18} />}
          </button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="posts">Liên quan nhất</TabsTrigger>
            <TabsTrigger value="hashtags">Chủ đề</TabsTrigger>
            <TabsTrigger value="users">Người dùng</TabsTrigger>
          </TabsList>

          <div className="mt-4">
            {isLoading && users.length === 0 ? (
              <p className="text-center text-gray-500">Đang tải...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <>
                <TabsContent value="posts">
                  {posts.length > 0 ? (
                    <PostList posts={posts} />
                  ) : (
                    <p className="text-center text-gray-500">
                      {hasSearched
                        ? "Không có bài viết nào được tìm thấy."
                        : "Nhập từ khóa để tìm kiếm bài viết."}
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="users">
                  {users.length > 0 ? (
                    <UserList users={users} isLoading={isLoading} hasMore={hasMore} />
                  ) : (
                    <p className="text-center text-gray-500">
                      {hasSearched
                        ? "Không có người dùng nào được tìm thấy."
                        : "Nhập từ khóa để tìm kiếm người dùng."}
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="hashtags">
                  {hashtags.length > 0 ? (
                    <div className="flex flex-wrap gap-2 p-4">
                      {hashtags.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2"
                        >
                          <span className="text-blue-500">{item.tag}</span>
                          <span className="text-sm text-gray-500">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">
                      {hasSearched
                        ? "Không có hashtag nào được tìm thấy."
                        : "Nhập từ khóa để tìm kiếm hashtag."}
                    </p>
                  )}
                  {posts.length > 0 ? (
                    <PostList posts={posts} />
                  ) : (
                    <p className="text-center text-gray-500">
                      {hasSearched
                        ? "Không có bài viết nào được tìm thấy."
                        : "Nhập từ khóa để tìm kiếm bài viết."}
                    </p>
                  )}
                </TabsContent>
              </>
            )}
          </div>
        </Tabs>
      </Card>
    </div>
  );
}
