import { Calendar, MessageSquare, Trophy, Users } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  username: string;
  joinDate: string;
  followers: string;
  posts: number;
  engagement: number;
}

export default function LinkedinAnalysisHeader({ name, username, joinDate, followers, posts, engagement }: ProfileHeaderProps) {
  return (
    <div className="bg-zinc-100 rounded-xl p-6 border">
      <div className="flex items-center gap-6">
        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop" alt={name} className="w-32 h-32 rounded-full border-4 border-gray-500" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-black">{name}</h1>
          <p className="text-indigo-400 mb-2">@{username}</p>
          <div className="flex items-center text-black">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Joined {joinDate}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center text-indigo-400 mb-2">
            <Users className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Followers</h3>
          </div>
          <p className="text-2xl font-bold text-black">{followers.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center text-indigo-400 mb-2">
            <MessageSquare className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Posts</h3>
          </div>
          <p className="text-2xl font-bold text-black">{posts.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center text-indigo-400 mb-2">
            <Trophy className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Engagement</h3>
          </div>
          <p className="text-2xl font-bold text-black">{engagement}%</p>
        </div>
      </div>
    </div>
  );
}
