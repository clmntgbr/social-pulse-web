"use client";

import useOrganizationsContext from "@/contexts/organizations/hooks";
import useSocialNetworksContext from "@/contexts/social-networks/hooks";
import useUserContext from "@/contexts/users/hooks";

export default function Page() {
  const { user } = useUserContext();
  const { organizations } = useOrganizationsContext();
  const { socialNetworks } = useSocialNetworksContext();
  return (
    <>
      {/* <pre>{JSON.stringify(user)}</pre>
      <pre>{JSON.stringify(organizations.organization)}</pre>
      <pre>{JSON.stringify(organizations.organizations)}</pre>
      <pre>{JSON.stringify(socialNetworks.socialNetworks)}</pre> */}
    </>
  );
}
