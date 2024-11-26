import { generateMonthlyStats } from "@/components/GenerateMonthlyStats";
import { Analysis } from "@/store/client/interface/analysis";
import { Insight } from "@/store/client/interface/insight";
import { Activity, Heart, MessageCircleMore, Share, UserRoundCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import LinkedinInsightChart from "./InsightChart";
import LinkedinInsightChartMultiple from "./InsightChartMultiple";
import LinkedinInsightPanel from "./InsightPanel";

interface LinkedinInsightProps {
  analysis: Analysis;
  insights: Insight[];
}

export default function LinkedinInsight({ analysis, insights }: LinkedinInsightProps) {
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    setChartData(generateMonthlyStats(analysis?.socialAccount?.posts ?? []));
  }, [analysis?.socialAccount?.posts]);

  const transformData = (inputData: Insight[], primaryKey: keyof Insight, secondaryKey: keyof Insight) => {
    const data = inputData.map((item) => ({
      month: item.label.replace(" 2024", ""),
      primary: item[primaryKey],
      secondary: item[secondaryKey],
    }));

    console.log("*********************");
    console.log(inputData, data);

    return data;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <LinkedinInsightPanel
          label="Followers"
          value={analysis?.socialAccount?.followerCount?.toString() ?? "~"}
          icon={Users}
          iconColor="text-pink-500"
        />
        <LinkedinInsightPanel
          label="Followings"
          value={analysis?.socialAccount?.followingCount?.toString() ?? "~"}
          icon={UserRoundCheck}
          iconColor="text-orange-500"
        />
        <LinkedinInsightPanel
          label="Likes"
          value={analysis?.socialAccount?.likeCount?.toString() ?? "~"}
          icon={Heart}
          hasTooltip={true}
          iconColor="text-red-600"
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
        <LinkedinInsightPanel
          label="Comments"
          value={analysis?.socialAccount?.commentCount?.toString() ?? "~"}
          icon={MessageCircleMore}
          iconColor="text-yellow-500"
          hasTooltip={true}
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
        <LinkedinInsightPanel
          label="Reposts"
          value={analysis?.socialAccount?.shareCount?.toString() ?? "~"}
          icon={Share}
          iconColor="text-blue-500"
          hasTooltip={true}
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
        <LinkedinInsightPanel
          label="Taux d'engagement"
          value={analysis?.socialAccount?.engagementRate?.toString() ?? "~"}
          type="%"
          hasTooltip={true}
          icon={Activity}
          iconColor="text-green-500"
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
        <LinkedinInsightChart title="Publications per month" label="Linkedin" data={chartData} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        <LinkedinInsightChartMultiple
          title="Publications per month / likes"
          labelPrimary="Publications"
          labelSecondary="Likes"
          data={transformData(insights, "posts", "likes")}
        />
        <LinkedinInsightChartMultiple
          title="Publications per month / comments"
          labelPrimary="Publications"
          labelSecondary="Comments"
          data={transformData(insights, "posts", "comments")}
        />
        <LinkedinInsightChartMultiple
          title="Publications per month / reposts"
          labelPrimary="Publications"
          labelSecondary="Reposts"
          data={transformData(insights, "posts", "reposts")}
        />
        <LinkedinInsightChartMultiple
          title="Publications per month / engagement rate"
          labelPrimary="Publications"
          labelSecondary="Rate"
          data={transformData(insights, "posts", "engagementRate")}
        />
      </div>
    </>
  );
}
