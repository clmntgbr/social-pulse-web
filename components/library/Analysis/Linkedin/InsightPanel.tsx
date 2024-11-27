import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, LucideIcon } from "lucide-react";

interface LinkedinInsightPanelProps {
  title: string;
  value: string;
  type?: string;
  option?: string;
  hasTooltip?: boolean;
  tooltipText?: string;
  icon?: LucideIcon;
  iconColor?: string;
}

export default function LinkedinInsightPanel({
  title,
  value,
  option = "",
  icon: Icon,
  iconColor = "",
  type = "",
  hasTooltip = false,
  tooltipText = "",
}: LinkedinInsightPanelProps) {
  return (
    <>
      <Card className="shadow-none relative">
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
          {Icon && <Icon strokeWidth={3} className={`h-4 w-4 ${iconColor}`} />}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {value}
            {type}
          </div>
          {option && <p className="text-xs text-muted-foreground">{option}</p>}
        </CardContent>
      </Card>
    </>
  );
}
