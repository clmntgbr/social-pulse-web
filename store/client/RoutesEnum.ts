/* eslint-disable @typescript-eslint/no-duplicate-enum-values */

export enum USERS {
  GET_USER = "/me",
  GET_LOGIN = "/auth/token",
  PATCH_USERS_ACTIVE_ORGANIZATION = "/users/active_organisation/{uuid}",
}
export enum ORGANIZATIONS {
  GET_ORGANIZATION = "/organization",
  GET_ORGANIZATIONS = "/organizations",
  POST_ORGANIZATIONS = "/organizations",
}
export enum PUBLICATIONS {
  GET_PUBLICATIONS = "/publications",
  GET_PUBLICATION = "/publications/{uuid}",
  POST_PUBLICATIONS = "/publications",
}
export enum SOCIAL_NETWORKS {
  GET_SOCIAL_NETWORKS = "/social_networks",
  POST_SOCIAL_NETWORKS_VALIDATE = "/social_networks/validate/{code}",
  GET_SOCIAL_NETWORKS_CONNECT = "/social_networks/{socialNetworksType}/connect?path={pathname}",
}
