import { generateMonthlyStats } from "@/components/GenerateMonthlyStats";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SocialAccount } from "@/store/client/interface/social-account";
import { Activity, Heart, MessageCircleMore, Share, UserRoundCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import LinkedinInsightChart from "./InsightChart";
import LinkedinInsightPanel from "./InsightPanel";

interface LinkedinInsightProps {
  socialAccount: SocialAccount;
}

export default function LinkedinInsight({ socialAccount }: LinkedinInsightProps) {
  const [chartData, setChartData] = useState<any>(null);
  useEffect(() => {
    setChartData(generateMonthlyStats(socialAccount.posts));
  }, [socialAccount]);

  return (
    <>
      <div className="flex items-center space-x-4 mb-8">
        <Avatar className="h-28 w-28">
          <AvatarImage src={socialAccount.profilePicture ?? "https://ui.shadcn.com/avatars/01.png"} className="w-full h-full" />
        </Avatar>
        <div>
          <h2 className="text-4xl font-bold tracking-tight">{socialAccount.name}</h2>
          <h4 className="text-sm text-muted-foreground">{socialAccount.headline}</h4>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <LinkedinInsightPanel label="Followers" value={socialAccount.followerCount?.toString() ?? "~"} icon={Users} iconColor="text-pink-500" />
        <LinkedinInsightPanel label="Followings" value={socialAccount.followingCount?.toString() ?? "~"} icon={UserRoundCheck} iconColor="text-orange-500" />
        <LinkedinInsightPanel label="Likes" value={socialAccount.likeCount?.toString() ?? "~"} icon={Heart} hasTooltip={true} iconColor="text-red-500" tooltipText={`Based on last ${socialAccount.postCount} publications`} />
        <LinkedinInsightPanel label="Comments" value={socialAccount?.commentCount?.toString() ?? "~"} icon={MessageCircleMore} iconColor="text-yellow-500" hasTooltip={true} tooltipText={`Based on last ${socialAccount.postCount} publications`} />
        <LinkedinInsightPanel label="Reposts" value={socialAccount.shareCount?.toString() ?? "~"} icon={Share} iconColor="text-blue-500" hasTooltip={true} tooltipText={`Based on last ${socialAccount.postCount} publications`} />
        <LinkedinInsightPanel label="Taux d'engagement" value={socialAccount.engagementRate?.toString() ?? "~"} type="%" hasTooltip={true} icon={Activity} iconColor="text-green-500" tooltipText={`Based on last ${socialAccount.postCount} publications`} />
        <LinkedinInsightChart title="Number of posts per month" label="Linkedin" data={chartData} />
      </div>
    </>
  );
}
