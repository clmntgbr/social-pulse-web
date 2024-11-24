import { Post } from "@/store/client/interface/post";

export function generateMonthlyStats(posts: Post[]) {
  const currentDate = new Date();

  const monthlyCount: { [key: string]: number } = {};

  for (let i = 0; i < 6; i++) {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - i);
    const monthName = date.toLocaleString("fr-FR", { month: "long" });
    const year = date.getFullYear();
    const monthKey = `${monthName} ${year}`;
    monthlyCount[monthKey] = 0;
  }

  const sixMonthsAgo = new Date(currentDate);
  sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

  const filteredPosts = posts.filter((post) => {
    const postDate = new Date(post.postAt);
    return postDate >= sixMonthsAgo && postDate <= currentDate;
  });

  filteredPosts.forEach((post) => {
    const postDate = new Date(post.postAt);
    const monthName = postDate.toLocaleString("fr-FR", { month: "long" });
    const year = postDate.getFullYear();
    const monthKey = `${monthName} ${year}`;
    if (monthKey in monthlyCount) {
      monthlyCount[monthKey]++;
    }
  });

  const chartData = Object.entries(monthlyCount)
    .reverse()
    .map(([month, count]) => ({
      month,
      desktop: count,
    }));

  return chartData;
}
