"use client";

import { getPublications } from "@/store/publications/getOrganizations";
import { useSession } from "next-auth/react";
import React, { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { initialPublicationsState, publicationsReducer, PublicationsState } from "./reducer";
import { PublicationsActionTypes } from "./types";

export type PublicationsContextType = {
  publications: PublicationsState;
  publicationsDispatch: Dispatch<PublicationsActionTypes>;
};

export const PublicationsContext = createContext<PublicationsContextType | undefined>(undefined);

export const PublicationsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [publications, publicationsDispatch] = useReducer(publicationsReducer, initialPublicationsState);
  const { data } = useSession();

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
      (window as { publicationsDispatch?: Dispatch<PublicationsActionTypes> }).publicationsDispatch = publicationsDispatch;
    }
  }, [publicationsDispatch]);

  useEffect(() => {
    const fetchPublications = async () => {
      if (data && data.accessToken) {
        getPublications(data.accessToken, publicationsDispatch);
      }
    };

    fetchPublications();
  }, [data]);

  return <PublicationsContext.Provider value={{ publications, publicationsDispatch }}>{children}</PublicationsContext.Provider>;
};
