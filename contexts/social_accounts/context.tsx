"use client";

import { getSocialAccounts } from "@/store/social_accounts/getSocialAccounts";
import { useAuth } from "@clerk/nextjs";
import React, { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { initialSocialAccountsState, socialAccountsReducer, SocialAccountsState } from "./reducer";
import { SocialAccountsActionTypes } from "./types";

export type SocialAccountsContextType = {
  socialAccounts: SocialAccountsState;
  socialAccountsDispatch: Dispatch<SocialAccountsActionTypes>;
};

export const SocialAccountsContext = createContext<SocialAccountsContextType | undefined>(undefined);

export const SocialAccountsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [socialAccounts, socialAccountsDispatch] = useReducer(socialAccountsReducer, initialSocialAccountsState);

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
      (
        window as {
          socialAccountsDispatch?: Dispatch<SocialAccountsActionTypes>;
        }
      ).socialAccountsDispatch = socialAccountsDispatch;
    }
  }, [socialAccountsDispatch]);

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchSocialAccounts = async () => {
      const token = await getToken();
      await getSocialAccounts(`${token}`, socialAccountsDispatch);
    };

    fetchSocialAccounts();
  }, [getToken]);

  return <SocialAccountsContext.Provider value={{ socialAccounts, socialAccountsDispatch }}>{children}</SocialAccountsContext.Provider>;
};
