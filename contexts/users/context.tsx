"use client";

import { getWorkspace } from "@/store/workspaces/getWorkspace";
import { getWorkspaces } from "@/store/workspaces/getWorkspaces";
import { useAuth } from "@clerk/nextjs";
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  useEffect,
  useReducer,
} from "react";
import { initialUserState, userReducer, UserState } from "./reducer";
import { UserActionTypes } from "./types";

export type UserContextType = {
  user: UserState;
  userDispatch: Dispatch<UserActionTypes>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, initialUserState);

  if (process.env.NODE_ENV === "development") {
    (window as { userDispatch?: Dispatch<UserActionTypes> }).userDispatch =
      userDispatch;
  }

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getToken();
      getWorkspaces(`${token}`, userDispatch);
      getWorkspace(`${token}`, userDispatch);
    };

    fetchUser();
  }, [getToken]);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};
