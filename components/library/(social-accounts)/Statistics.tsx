"use client";

import useSocialAccountsContext from "@/contexts/social_accounts/hooks";
import { MessageCircle, Share2, TrendingUp, Users } from "lucide-react";
import { Fragment } from "react";

export function Statistics() {
  const { socialAccounts } = useSocialAccountsContext();

  let totalFollowers = 0;
  let totalPosts = 0;
  let totalLikes = 0;

  socialAccounts?.socialAccounts?.member.forEach((account) => {
    totalFollowers += account.followersCount || 0;
    totalPosts += account.nbOfPosts || 0;
    totalLikes += account.likeCount || 0;
  });

  const stats = [
    { icon: Users, label: "Total Followers", value: totalFollowers },
    { icon: MessageCircle, label: "Total Likes", value: totalLikes },
    { icon: Share2, label: "Total Posts", value: totalPosts },
    { icon: TrendingUp, label: "Average Growth", value: "+10.25%" },
  ];

  return (
    <Fragment>
      {stats.map((stat) => (
        <div className="bg-white p-6 transition-all rounded-xl border bg-card shadow-xs" key={crypto.randomUUID()}>
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <stat.icon className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
}
