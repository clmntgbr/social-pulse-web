"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface LinkedinInsightChartProps {
  title: string;
  label: string;
  data: any;
}

export default function LinkedinInsightChart({ title, label, data }: LinkedinInsightChartProps) {
  const chartConfig = {
    desktop: {
      label,
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="h-full lg:row-span-2 lg:col-start-4 lg:row-start-1">
      <CardHeader className="text-sm font-medium flex items-center p-3">{title}</CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
