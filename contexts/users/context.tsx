"use client";

import { getUser } from "@/store/users/getUser";
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

  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      typeof window !== "undefined"
    ) {
      (window as { userDispatch?: Dispatch<UserActionTypes> }).userDispatch =
        userDispatch;
    }
  }, [userDispatch]);

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getToken();

      await getUser(`${token}`, userDispatch);

      const timer = setInterval(async () => {
        await getUser(`${token}`, userDispatch);
      }, 10000);

      return () => clearTimeout(timer);
    };

    fetchUser();
  }, [getToken]);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};
