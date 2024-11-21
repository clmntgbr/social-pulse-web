import { Eye, MousePointer, TrendingUp, Users } from "lucide-react";

interface InsightMetric {
  label: string;
  value: number;
  change: number;
}

interface InsightsPanelProps {
  metrics: InsightMetric[];
}

export default function LinkedinAnalysisInsight({ metrics }: InsightsPanelProps) {
  return (
    <div className="bg-zinc-100 rounded-xl p-6 border">
      <h2 className="text-2xl font-bold text-black mb-6">Performance Insights</h2>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center text-indigo-400">
                {index === 0 && <TrendingUp className="w-5 h-5 mr-2" />}
                {index === 1 && <Users className="w-5 h-5 mr-2" />}
                {index === 2 && <Eye className="w-5 h-5 mr-2" />}
                {index === 3 && <MousePointer className="w-5 h-5 mr-2" />}
                <h3 className="font-semibold">{metric.label}</h3>
              </div>
              <span className={`text-sm ${metric.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                {metric.change >= 0 ? "+" : ""}
                {metric.change}%
              </span>
            </div>
            <p className="text-2xl font-bold text-black">{metric.value.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
