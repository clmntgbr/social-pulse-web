"use client";

import { getAnalysesRecents } from "@/store/analyses/getAnalysesRecents";
import { getAnalysesFavorites } from "@/store/analyses/getAnalysesFavorites";
import { useSession } from "next-auth/react";
import React, { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { analysisReducer, AnalysisState, initialAnalysisState } from "./reducer";
import { AnalysisActionTypes } from "./types";

export type AnalysisContextType = {
  analysis: AnalysisState;
  analysisDispatch: Dispatch<AnalysisActionTypes>;
};

export const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [analysis, analysisDispatch] = useReducer(analysisReducer, initialAnalysisState);
  const { data } = useSession();

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
      (window as { analysisDispatch?: Dispatch<AnalysisActionTypes> }).analysisDispatch = analysisDispatch;
    }
  }, [analysisDispatch]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (data && data.accessToken) {
        await getAnalysesRecents(`${data?.accessToken}`, analysisDispatch);
        await getAnalysesFavorites(`${data?.accessToken}`, analysisDispatch);
      }
    };

    fetchAnalysis();
  }, [data]);

  return <AnalysisContext.Provider value={{ analysis, analysisDispatch }}>{children}</AnalysisContext.Provider>;
};
