import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";

interface Props {
  children?: ReactNode;
}

const ExpandableText = ({ children }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div onClick={() => setIsExpanded(!isExpanded)} className={`relative cursor-pointer ${isExpanded ? "" : "line-clamp-[10]"}`}>
        {children}
      </div>

      <Button variant="link" onClick={() => setIsExpanded(!isExpanded)} className="text-gray-500 hover:text-gray-700 p-0 h-auto">
        {isExpanded ? "Voir moins" : "Voir plus"}
      </Button>
    </div>
  );
};

export default ExpandableText;
