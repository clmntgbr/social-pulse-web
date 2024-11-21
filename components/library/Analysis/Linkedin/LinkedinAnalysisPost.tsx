import { Heart, MessageCircle, Share2 } from "lucide-react";

interface Post {
  id: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  date: string;
}

interface PostListProps {
  title: string;
  posts: Post[];
}

export default function LinkedinAnalysisPost({ title, posts }: PostListProps) {
  return (
    <div className="bg-zinc-100 rounded-xl p-6 border">
      <h2 className="text-2xl font-bold text-black mb-6">{title}</h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg p-4 border">
            <div className="flex gap-4">
              {post.image && <img src={post.image} alt="" className="w-32 h-32 object-cover rounded-lg" />}
              <div className="flex-1">
                <p className="text-black mb-4">{post.content}</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center text-pink-500">
                    <Heart className="w-5 h-5 mr-2" />
                    <span>{post.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center text-blue-500">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    <span>{post.comments.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center text-green-500">
                    <Share2 className="w-5 h-5 mr-2" />
                    <span>{post.shares.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="text-black text-sm">{post.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
