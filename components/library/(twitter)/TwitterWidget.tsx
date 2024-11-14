import { Bookmark, Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import React from "react";

interface TwitterWidgetProps {
  border: string;
}

export const TwitterWidget: React.FC<TwitterWidgetProps> = ({ border }) => {
  return (
    <div className={`flex items-center justify-between mt-3 -ml-2 ${border}`}>
      <button className="group flex items-center space-x-1 text-gray-500">
        <div className="p-2 hover:bg-blue-200 rounded-full hover:text-blue-500">
          <MessageCircle className="w-5 h-5" />
        </div>
      </button>

      <button className={`group flex items-center space-x-1 text-gray-500`}>
        <div className="p-2 hover:bg-green-200 rounded-full hover:text-green-500">
          <Repeat2 className="w-5 h-5" />
        </div>
      </button>

      <button className={`group flex items-center space-x-1 text-gray-500`}>
        <div className="p-2 hover:bg-pink-200 rounded-full hover:text-pink-500">
          <Heart className={`w-5 h-5`} />
        </div>
      </button>

      <button className={`p-2 rounded-full text-gray-500`}>
        <div className="p-2 hover:bg-blue-200 rounded-full hover:text-blue-500">
          <Bookmark className={`w-5 h-5`} />
        </div>
      </button>

      <button className="p-2 text-gray-500">
        <div className="p-2 hover:bg-blue-200 rounded-full hover:text-blue-500">
          <Share className="w-5 h-5" />
        </div>
      </button>
    </div>
  );
};
