import React, { PropsWithChildren } from "react";
import { PostsProvider } from "./posts";
import { SocialAccountsProvider } from "./social_accounts";
import { UserProvider } from "./users";
import { WorkspacesProvider } from "./workspaces";

const AppContextProviders: React.FC<PropsWithChildren> = ({ children }) => (
  <UserProvider>
    <WorkspacesProvider>
      <SocialAccountsProvider>
        <PostsProvider>
          <AppHooksProvider>{children}</AppHooksProvider>
        </PostsProvider>
      </SocialAccountsProvider>
    </WorkspacesProvider>
  </UserProvider>
);

export { AppContextProviders };

const AppHooksProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};
