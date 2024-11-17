import React, { PropsWithChildren } from "react";
import { AnalysisProvider } from "./analyses";
import { UserProvider } from "./users";

const AppContextProviders: React.FC<PropsWithChildren> = ({ children }) => (
  <UserProvider>
    <AnalysisProvider>
      <AppHooksProvider>{children}</AppHooksProvider>
    </AnalysisProvider>
  </UserProvider>
);

export { AppContextProviders };

const AppHooksProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};
