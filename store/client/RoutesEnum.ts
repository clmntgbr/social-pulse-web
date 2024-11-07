/* eslint-disable @typescript-eslint/no-duplicate-enum-values */

export enum SOCIAL_ACCOUNTS {
  GET_SOCIAL_ACCOUNTS = "/social_accounts",
  DELETE_SOCIAL_ACCOUNTS = "/social_accounts/%socialAccountUuid%",
  GET_LINKEDIN_LOGIN_URL = "/linkedin/login_url?callback=%s",
  GET_FACEBOOK_LOGIN_URL = "/facebook/login_url?callback=%s",
  GET_TWITTER_LOGIN_URL = "/twitter/login_url?callback=%s",
}

export enum WORKSPACES {
  GET_WORKSPACES = "/workspaces",
  POST_WORKSPACES = "/workspaces",
  DELETE_WORKSPACE_USER = "/workspaces/%workspaceUuid%/user/%userUuid%",
  POST_WORKSPACE_PROMOTE = "/workspaces/%workspaceUuid%/promote/%userUuid%",
  GET_WORKSPACE = "/workspace",
  WORKSPACE_INVITATION = "/workspace_invitations",
  PATCH_WORKSPACE = "/workspaces",
}

export enum USERS {
  GET_USER = "/me",
  POST_LOGIN = "/auth/token",
  PATCH_USER_WORKSPACE = "/users/workspace",
}
