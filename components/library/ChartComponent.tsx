"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Info } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface Props {
  title: string;
  label: string;
  data: any;
  className: string;
  hasTooltip: boolean;
  tooltipText?: string;
}

export default function ChartComponent({ title, label, data, className, tooltipText, hasTooltip }: Props) {
  const chartConfig = {
    value: {
      label,
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-3">
          {title}
          {hasTooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="text-muted-foreground w-5">
                  <Info strokeWidth={1.5} color="#000" />
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
            <XAxis dataKey={"key"} tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="value" fill="var(--color-value)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
