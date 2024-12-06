"use client";

import { getOrganization } from "@/store/organizations/getOrganization";
import { getOrganizations } from "@/store/organizations/getOrganizations";
import { useSession } from "next-auth/react";
import React, { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { initialOrganizationsState, organizationsReducer, OrganizationsState } from "./reducer";
import { OrganizationsActionTypes } from "./types";

export type OrganizationsContextType = {
  organizations: OrganizationsState;
  organizationsDispatch: Dispatch<OrganizationsActionTypes>;
};

export const OrganizationsContext = createContext<OrganizationsContextType | undefined>(undefined);

export const OrganizationsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [organizations, organizationsDispatch] = useReducer(organizationsReducer, initialOrganizationsState);
  const { data } = useSession();

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
      (window as { organizationsDispatch?: Dispatch<OrganizationsActionTypes> }).organizationsDispatch = organizationsDispatch;
    }
  }, [organizationsDispatch]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      if (data && data.accessToken) {
        getOrganization(data.accessToken, organizationsDispatch);
        getOrganizations(data.accessToken, organizationsDispatch);
      }
    };

    fetchOrganizations();
  }, [data]);

  return <OrganizationsContext.Provider value={{ organizations, organizationsDispatch }}>{children}</OrganizationsContext.Provider>;
};
