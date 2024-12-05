import { Hourly, InsightHourly } from "@/store/client/interface/insight";

export function generateHourlyStats(data: InsightHourly | null, key: keyof Hourly) {
  if (!data) {
    return [];
  }

  return Object.entries(data)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .map(([hour, stats]) => ({
      key: `${hour}`,
      value: stats[key],
    }));
}
