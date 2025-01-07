import { Forward, MessageCircleMore, Pin, ThumbsUp } from "lucide-react";

export default function LinkedinAction() {
  return (
    <div className="flex justify-between items-center mt-4 w-full text-gray-500">
      <button className="flex items-center gap-2 hover:text-blue-500 mx-auto">
        <ThumbsUp />
        <span className="text-sm">Like</span>
      </button>

      <button className="flex items-center gap-2 hover:text-green-500 mx-auto">
        <MessageCircleMore />
        <span className="text-sm">Comment</span>
      </button>

      <button className="flex items-center gap-2 hover:text-red-500 mx-auto">
        <Forward />
        <span className="text-sm">Share</span>
      </button>

      <button className="flex items-center gap-2 hover:text-blue-500 mx-auto">
        <Pin />
        <span className="text-sm">Save</span>
      </button>
    </div>
  );
}
