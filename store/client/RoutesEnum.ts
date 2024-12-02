/* eslint-disable @typescript-eslint/no-duplicate-enum-values */

export enum USERS {
  GET_USER = "/me",
  GET_LOGIN = "/auth/token",
}

export enum ANALYSES {
  POST_ANALYSIS = "/analyses",
  POST_ANALYSIS_TO_FAVORITES = "/analysis/favorites",
  GET_ANALYSIS = "/analysis/%uuid%",
  GET_ANALYSIS_INSIGHTS = "/analysis/%uuid%/insights",
  GET_ANALYSES_RECENTS = "/analyses/recents",
  GET_ANALYSES_FAVORITES = "/analyses/favorites",
  GET_ANALYSES_PLATFORMS = "/analyses/platforms",
}
