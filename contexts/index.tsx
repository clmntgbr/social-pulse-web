import React, { PropsWithChildren } from "react";
import { OrganizationsProvider } from "./organizations";
import { PublicationsProvider } from "./publications";
import { SocialNetworksProvider } from "./social-networks";
import { UserProvider } from "./users";

const AppContextProviders: React.FC<PropsWithChildren> = ({ children }) => (
  <UserProvider>
    <OrganizationsProvider>
      <SocialNetworksProvider>
        <PublicationsProvider>
          <AppHooksProvider>{children}</AppHooksProvider>
        </PublicationsProvider>
      </SocialNetworksProvider>
    </OrganizationsProvider>
  </UserProvider>
);

export { AppContextProviders };

const AppHooksProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};
