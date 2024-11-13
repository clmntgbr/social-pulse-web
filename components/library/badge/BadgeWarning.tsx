import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/locales/client";

interface BadgeProps {
  label: string;
  className?: string;
}

export const BadgeWarning: React.FC<BadgeProps> = ({ label, className = "" }) => {
  const t = useI18n();

  return <Badge className={`text-xs ${className} bg-orange-500 hover:bg-orange-500`}>{t(label)}</Badge>;
};
