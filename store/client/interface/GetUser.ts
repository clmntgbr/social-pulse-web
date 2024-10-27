export interface GetUser {
  "@context": string;
  "@id": string;
  "@type": string;
  uuid: string;
  email: string;
  givenName: string | null;
  familyName: string | null;
  avatarUrl: string | null;
}
