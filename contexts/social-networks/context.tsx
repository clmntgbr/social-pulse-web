"use client";

import { getSocialNetworks } from "@/store/social-networks/getSocialNetworks";
import { useSession } from "next-auth/react";
import React, { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { initialSocialNetworksState, socialNetworksReducer, SocialNetworksState } from "./reducer";
import { SocialNetworksActionTypes } from "./types";

export type SocialNetworksContextType = {
  socialNetworks: SocialNetworksState;
  socialNetworksDispatch: Dispatch<SocialNetworksActionTypes>;
};

export const SocialNetworksContext = createContext<SocialNetworksContextType | undefined>(undefined);

export const SocialNetworksProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [socialNetworks, socialNetworksDispatch] = useReducer(socialNetworksReducer, initialSocialNetworksState);
  const { data } = useSession();

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
      (window as { socialNetworksDispatch?: Dispatch<SocialNetworksActionTypes> }).socialNetworksDispatch = socialNetworksDispatch;
    }
  }, [socialNetworksDispatch]);

  useEffect(() => {
    const fetchSocialNetworks = async () => {
      if (data && data.accessToken) {
        getSocialNetworks(data.accessToken, socialNetworksDispatch);
      }
    };

    fetchSocialNetworks();
  }, [data]);

  return <SocialNetworksContext.Provider value={{ socialNetworks, socialNetworksDispatch }}>{children}</SocialNetworksContext.Provider>;
};
