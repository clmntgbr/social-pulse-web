"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface Props {
  title: string;
  labelPrimary: string;
  labelSecondary: string;
  hasTooltip: boolean;
  tooltipText?: string;
  data: any;
}

export default function LinkedinInsightChartMultiple({ title, labelPrimary, hasTooltip, tooltipText, labelSecondary, data }: Props) {
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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-3">
          {title}
          {hasTooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="text-muted-foreground w-5">
                  <Info strokeWidth={3} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tooltipText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardTitle>
      </CardHeader>
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
