import { generateHourlyStats } from "@/components/GenerateHourlyStats";
import { GetAnalysisInsights } from "@/store/client/interface/GetAnalysisInsights";
import { InsightMonthtly } from "@/store/client/interface/insight";
import { useState } from "react";
import ChartComponent from "../../ChartComponent";
import ChartMultipleComponent from "../../ChartMultipleComponent";

interface Props {
  insights: GetAnalysisInsights | null;
}

export default function LinkedinChart({ insights }: Props) {
  const [chartDataLikes] = useState<any>(generateHourlyStats(insights?.hourlyStats ?? null, "likes"));
  const [chartDataComments] = useState<any>(generateHourlyStats(insights?.hourlyStats ?? null, "comments"));
  const [chartDataReposts] = useState<any>(generateHourlyStats(insights?.hourlyStats ?? null, "reposts"));
  const [chartDataEngagementRate] = useState<any>(generateHourlyStats(insights?.hourlyStats ?? null, "engagementRate"));

  const transformData = (inputData: InsightMonthtly[], primaryKey: keyof InsightMonthtly, secondaryKey: keyof InsightMonthtly) => {
    const data = inputData.map((item) => ({
      month: item.label.replace(" 2024", ""),
      primary: item[primaryKey],
      secondary: item[secondaryKey],
    }));
    return data;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ChartMultipleComponent
          title="Publications per month / likes"
          labelPrimary="Publications"
          labelSecondary="Likes"
          hasTooltip={false}
          data={transformData(insights?.monthlyStats ?? [], "posts", "likes")}
        />
        <ChartMultipleComponent
          title="Publications per month / comments"
          labelPrimary="Publications"
          labelSecondary="Comments"
          hasTooltip={false}
          data={transformData(insights?.monthlyStats ?? [], "posts", "comments")}
        />
        <ChartMultipleComponent
          title="Publications per month / reposts"
          labelPrimary="Publications"
          labelSecondary="Reposts"
          hasTooltip={false}
          data={transformData(insights?.monthlyStats ?? [], "posts", "reposts")}
        />
        <ChartMultipleComponent
          title="Publications per month / engagement rate"
          labelPrimary="Publications"
          labelSecondary="Rate"
          hasTooltip={false}
          data={transformData(insights?.monthlyStats ?? [], "posts", "engagementRate")}
        />
        <ChartComponent title="Likes per hour of publications" hasTooltip={false} label="Linkedin" className="" data={chartDataLikes} />
        <ChartComponent title="Comments per hour of publications" hasTooltip={false} label="Linkedin" className="" data={chartDataComments} />
        <ChartComponent title="Reposts per hour of publications" hasTooltip={false} label="Linkedin" className="" data={chartDataReposts} />
        <ChartComponent
          title="Engagement rate per hour of publications"
          hasTooltip={false}
          label="Linkedin"
          className=""
          data={chartDataEngagementRate}
        />
      </div>
    </>
  );
}
