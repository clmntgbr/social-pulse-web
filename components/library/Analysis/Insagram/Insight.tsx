import { generateMonthlyStats } from "@/components/GenerateMonthlyStats";
import { Analysis } from "@/store/client/interface/analysis";
import { GetAnalysisInsights } from "@/store/client/interface/GetAnalysisInsights";
import { Activity, Heart, MessageCircleMore, Share, UserRoundCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import ChartComponent from "../../ChartComponent";
import InstagramInsightPanel from "./InsightPanel";

interface Props {
  analysis: Analysis;
  insights: GetAnalysisInsights | null;
}

export default function InstagramInsight({ analysis, insights }: Props) {
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    setChartData(generateMonthlyStats(analysis?.socialAccount?.posts ?? []));
  }, [analysis?.socialAccount?.posts]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InstagramInsightPanel title="Followers" value={analysis?.socialAccount?.followerCount} icon={Users} iconColor="text-pink-500" />
        <InstagramInsightPanel title="Followings" value={analysis?.socialAccount?.followingCount} icon={UserRoundCheck} iconColor="text-orange-500" />
        <InstagramInsightPanel
          title="Likes"
          value={analysis?.socialAccount?.likeCount}
          icon={Heart}
          hasTooltip={true}
          iconColor="text-red-600"
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
        <InstagramInsightPanel
          title="Comments"
          value={analysis?.socialAccount?.commentCount}
          icon={MessageCircleMore}
          iconColor="text-yellow-500"
          hasTooltip={true}
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
        <InstagramInsightPanel
          title="Reposts"
          value={analysis?.socialAccount?.shareCount}
          icon={Share}
          iconColor="text-blue-500"
          hasTooltip={true}
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
        <InstagramInsightPanel
          title="Engagement rate"
          value={analysis?.socialAccount?.engagementRate}
          type="%"
          hasTooltip={true}
          icon={Activity}
          iconColor="text-green-500"
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
        <ChartComponent
          title="Publications per month"
          label="Linkedin"
          data={chartData}
          hasTooltip={false}
          className="rounded-xl border bg-card text-card-foreground shadow h-full 
            lg:row-span-2 lg:col-start-4 lg:row-start-1 md:col-span-2"
        />
        <InstagramInsightPanel
          title="Average likes per publications"
          value={insights?.averageLikes}
          icon={Heart}
          hasTooltip={true}
          iconColor="text-red-600"
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
        <InstagramInsightPanel
          title="Average comments per publications"
          value={insights?.averageComments}
          icon={MessageCircleMore}
          hasTooltip={true}
          iconColor="text-yellow-500"
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
        <InstagramInsightPanel
          title="Average reposts per publications"
          value={insights?.averageReposts}
          icon={Share}
          hasTooltip={true}
          iconColor="text-blue-500"
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
      </div>
    </>
  );
}
