"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface LinkedinInsightChartMultipleProps {
  title: string;
  labelPrimary: string;
  labelSecondary: string;
  data: any;
}

export default function LinkedinInsightChartMultiple({ title, labelPrimary, labelSecondary, data }: LinkedinInsightChartMultipleProps) {
  const chartConfig = {
    primary: {
      label: labelPrimary,
      color: "hsl(var(--chart-1))",
    },
    secondary: {
      label: labelSecondary,
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="">
      <CardHeader className="text-sm font-medium flex items-center p-3">{title}</CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="primary" fill="var(--color-primary)" radius={4} />
            <Bar dataKey="secondary" fill="var(--color-secondary)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
