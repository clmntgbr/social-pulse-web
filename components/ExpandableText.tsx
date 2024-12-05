import { Button } from "@/components/ui/button";
import { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  children?: ReactNode;
}

const ExpandableText = ({ children }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkHeight = () => {
      const element = textRef.current;
      if (!element) return;

      const style = window.getComputedStyle(element);
      const lineHeight = parseInt(style.lineHeight);
      const height = element.scrollHeight;

      setShouldShowButton(height > lineHeight * 10);
    };

    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, [children]);

  return (
    <div>
      <div
        ref={textRef}
        onClick={() => shouldShowButton && setIsExpanded(!isExpanded)}
        className={`relative ${shouldShowButton && !isExpanded ? "line-clamp-[10]" : ""} ${shouldShowButton ? "cursor-pointer" : ""}`}
      >
        {children}
      </div>

      {shouldShowButton && (
        <Button variant="link" onClick={() => setIsExpanded(!isExpanded)} className="text-gray-500 hover:text-gray-700 p-0 h-auto">
          {isExpanded ? "Voir moins" : "Voir plus"}
        </Button>
      )}
    </div>
  );
};

export default ExpandableText;
