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
import {
  initialWorkspacesState,
  workspacesReducer,
  WorkspacesState,
} from "./reducer";
import { WorkspacesActionTypes } from "./types";

export type WorkspacesContextType = {
  workspaces: WorkspacesState;
  workspacesDispatch: Dispatch<WorkspacesActionTypes>;
};

export const WorkspacesContext = createContext<
  WorkspacesContextType | undefined
>(undefined);

export const WorkspacesProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [workspaces, workspacesDispatch] = useReducer(
    workspacesReducer,
    initialWorkspacesState
  );

  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      typeof window !== "undefined"
    ) {
      (
        window as { workspacesDispatch?: Dispatch<WorkspacesActionTypes> }
      ).workspacesDispatch = workspacesDispatch;
    }
  }, [workspacesDispatch]);

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const token = await getToken();

      await getWorkspaces(`${token}`, workspacesDispatch);
      await getWorkspace(`${token}`, workspacesDispatch);
    };

    fetchWorkspaces();
  }, [getToken]);

  return (
    <WorkspacesContext.Provider value={{ workspaces, workspacesDispatch }}>
      {children}
    </WorkspacesContext.Provider>
  );
};
