import React, { PropsWithChildren } from "react";
import { WorkspacesProvider } from "./workspaces";

const AppContextProviders: React.FC<PropsWithChildren> = ({ children }) => (
  <WorkspacesProvider>
    <AppHooksProvider>{children}</AppHooksProvider>
  </WorkspacesProvider>
);

export { AppContextProviders };

const AppHooksProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};
