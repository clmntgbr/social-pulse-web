import React, { PropsWithChildren } from "react";
import { SocialAccountsProvider } from "./social_accounts";
import { UserProvider } from "./users";
import { WorkspacesProvider } from "./workspaces";

const AppContextProviders: React.FC<PropsWithChildren> = ({ children }) => (
  <UserProvider>
    <WorkspacesProvider>
      <SocialAccountsProvider>
        <AppHooksProvider>{children}</AppHooksProvider>
      </SocialAccountsProvider>
    </WorkspacesProvider>
  </UserProvider>
);

export { AppContextProviders };

const AppHooksProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};
