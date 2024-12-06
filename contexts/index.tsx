import React, { PropsWithChildren } from "react";
import { OrganizationsProvider } from "./organizations";
import { SocialNetworksProvider } from "./social-networks";
import { UserProvider } from "./users";

const AppContextProviders: React.FC<PropsWithChildren> = ({ children }) => (
  <UserProvider>
    <OrganizationsProvider>
      <SocialNetworksProvider>
        <AppHooksProvider>{children}</AppHooksProvider>
      </SocialNetworksProvider>
    </OrganizationsProvider>
  </UserProvider>
);

export { AppContextProviders };

const AppHooksProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};
