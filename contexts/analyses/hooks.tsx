import { useContext } from "react";
import { AnalysisContext, AnalysisContextType } from "./context";

export default function useAnalysisContext(): AnalysisContextType {
  const analysisContext = useContext(AnalysisContext);

  if (analysisContext === undefined) {
    // @ts-expect-error: Log error instead of throw
    return;
  }

  return analysisContext;
}
