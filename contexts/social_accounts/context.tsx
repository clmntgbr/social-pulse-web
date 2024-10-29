"use client";

import { getSocialAccounts } from "@/store/social_accounts/getSocialAccounts";
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
      (
        window as {
          socialAccountsDispatch?: Dispatch<SocialAccountsActionTypes>;
        }
      ).socialAccountsDispatch = socialAccountsDispatch;
    }
  }, [socialAccountsDispatch]);

  useEffect(() => {
    const fetchSocialAccounts = async () => {
      if (session !== undefined && session !== null) {
        await getSocialAccounts(session?.accessToken ?? "", socialAccountsDispatch);
      }
    };

    fetchSocialAccounts();
  }, [session]);

  return <SocialAccountsContext.Provider value={{ socialAccounts, socialAccountsDispatch }}>{children}</SocialAccountsContext.Provider>;
};
