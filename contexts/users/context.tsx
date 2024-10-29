"use client";

import { AuthSession } from "@/app/api/auth/session/route";
import { getUser } from "@/store/users/getUser";
import { useSession } from "next-auth/react";
import React, { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { initialUserState, userReducer, UserState } from "./reducer";
import { UserActionTypes } from "./types";

export type UserContextType = {
  user: UserState;
  userDispatch: Dispatch<UserActionTypes>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, initialUserState);
  const { data: session } = useSession();

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
      (window as { userDispatch?: Dispatch<UserActionTypes> }).userDispatch = userDispatch;
    }
  }, [userDispatch]);

  useEffect(() => {
    const fetchUser = async () => {
      if (session !== undefined && session !== null) {
        await getUser((session as AuthSession).token, userDispatch);
      }
    };

    fetchUser();
  }, [session]);

  return <UserContext.Provider value={{ user, userDispatch }}>{children}</UserContext.Provider>;
};
