export type InsightMonthtly = {
  month: string;
  label: string;
  year: string;
  posts: number;
  likes: number;
  comments: number;
  reposts: number;
  engagementRate: number;
};

export type InsightHourly = {
  [hour: string]: Hourly;
};

export type Hourly = {
  likes: number;
  comments: number;
  reposts: number;
  engagementRate: number;
};
