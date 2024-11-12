"use client";

import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function StatsCard({ icon: Icon, label, value }: StatsCardProps) {
  return (
    <div className="bg-white p-6 transition-all rounded-xl border bg-card shadow-xs">
      <div className="flex items-center space-x-4">
        <div className="bg-indigo-100 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
