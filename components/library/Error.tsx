import { useI18n } from "@/locales/client";
import { useEffect, useState } from "react";

interface ErrorProps {
  label: string;
}

export const Error: React.FC<ErrorProps> = ({ label }) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = useI18n();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center bg-transparent">
      <div className={`text-center transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} transition-all duration-700 ease-out`}>
        <div className="p-8 rounded-xl backdrop-blur-lg ">
          <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t(`${label}`)}</h2>
        </div>
      </div>
    </div>
  );
};
