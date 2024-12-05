import { InsightHourly, InsightMonthtly } from "./insight";

type AnalysisInsights = {
  hourlyStats: InsightHourly;
  monthlyStats: InsightMonthtly[];
  averageLikes: number;
  averageComments: number;
  averageReposts: number;
};

export type GetAnalysisInsights = AnalysisInsights;
