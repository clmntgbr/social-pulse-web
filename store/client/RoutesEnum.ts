/* eslint-disable @typescript-eslint/no-duplicate-enum-values */

export enum USERS {
  GET_USER = "/me",
  GET_LOGIN = "/auth/token",
}

export enum ANALYSES {
  POST_ANALYSIS = "/analyses",
  GET_ANALYSIS = "/analysis/%uuid%",
  GET_ANALYSES_RECENTS = "/analyses/recents",
  GET_ANALYSES_FAVORITES = "/analyses/favorites",
}
