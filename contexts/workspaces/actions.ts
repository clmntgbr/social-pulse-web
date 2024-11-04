export enum WorkspacesAction {
  WORKSPACES_LOADING_START = "WORKSPACES_LOADING_START",
  WORKSPACES_LOADING_END = "WORKSPACES_LOADING_END",

  LOADING_START = "LOADING_START",
  LOADING_END = "LOADING_END",

  GET_WORKSPACES_SUCCESS = "GET_WORKSPACES_SUCCESS",
  GET_WORKSPACES_NOT_FOUND = "GET_WORKSPACES_NOT_FOUND",
  GET_WORKSPACES_HTTP_INTERNAL_ERROR = "GET_WORKSPACES_HTTP_INTERNAL_ERROR",
  GET_WORKSPACES_ERROR = "GET_WORKSPACES_ERROR",

  GET_WORKSPACES_FULL_SUCCESS = "GET_WORKSPACES_FULL_SUCCESS",
  GET_WORKSPACES_FULL_NOT_FOUND = "GET_WORKSPACES_FULL_NOT_FOUND",
  GET_WORKSPACES_FULL_HTTP_INTERNAL_ERROR = "GET_WORKSPACES_FULL_HTTP_INTERNAL_ERROR",
  GET_WORKSPACES_FULL_ERROR = "GET_WORKSPACES_FULL_ERROR",

  POST_WORKSPACES_SUCCESS = "POST_WORKSPACES_SUCCESS",
  POST_WORKSPACES_NOT_FOUND = "POST_WORKSPACES_NOT_FOUND",
  POST_WORKSPACES_HTTP_INTERNAL_ERROR = "POST_WORKSPACES_HTTP_INTERNAL_ERROR",
  POST_WORKSPACES_ERROR = "POST_WORKSPACES_ERROR",

  DELETE_WORKSPACE_USER_SUCCESS = "DELETE_WORKSPACE_USER_SUCCESS",
  DELETE_WORKSPACE_USER_NOT_FOUND = "DELETE_WORKSPACE_USER_NOT_FOUND",
  DELETE_WORKSPACE_USER_HTTP_INTERNAL_ERROR = "DELETE_WORKSPACE_USER_HTTP_INTERNAL_ERROR",
  DELETE_WORKSPACE_USER_ERROR = "DELETE_WORKSPACE_USER_ERROR",

  POST_WORKSPACE_PROMOTE_SUCCESS = "POST_WORKSPACE_PROMOTE_SUCCESS",
  POST_WORKSPACE_PROMOTE_NOT_FOUND = "POST_WORKSPACE_PROMOTE_NOT_FOUND",
  POST_WORKSPACE_PROMOTE_HTTP_INTERNAL_ERROR = "POST_WORKSPACE_PROMOTE_HTTP_INTERNAL_ERROR",
  POST_WORKSPACE_PROMOTE_ERROR = "POST_WORKSPACE_PROMOTE_ERROR",

  POST_WORKSPACE_INVITATION_SUCCESS = "POST_WORKSPACE_INVITATION_SUCCESS",
  POST_WORKSPACE_INVITATION_NOT_FOUND = "POST_WORKSPACE_INVITATION_NOT_FOUND",
  POST_WORKSPACE_INVITATION_HTTP_INTERNAL_ERROR = "POST_WORKSPACE_INVITATION_HTTP_INTERNAL_ERROR",
  POST_WORKSPACE_INVITATION_ERROR = "POST_WORKSPACE_INVITATION_ERROR",

  PATCH_WORKSPACE_SUCCESS = "PATCH_WORKSPACE_SUCCESS",
  PATCH_WORKSPACE_NOT_FOUND = "PATCH_WORKSPACE_NOT_FOUND",
  PATCH_WORKSPACE_HTTP_INTERNAL_ERROR = "PATCH_WORKSPACE_HTTP_INTERNAL_ERROR",
  PATCH_WORKSPACE_ERROR = "PATCH_WORKSPACE_ERROR",

  PATCH_WORKSPACE_INVITATION_SUCCESS = "PATCH_WORKSPACE_INVITATION_SUCCESS",
  PATCH_WORKSPACE_INVITATION_NOT_FOUND = "PATCH_WORKSPACE_INVITATION_NOT_FOUND",
  PATCH_WORKSPACE_INVITATION_HTTP_INTERNAL_ERROR = "PATCH_WORKSPACE_INVITATION_HTTP_INTERNAL_ERROR",
  PATCH_WORKSPACE_INVITATION_ERROR = "PATCH_WORKSPACE_INVITATION_ERROR",

  GET_WORKSPACE_INVITATIONS_SUCCESS = "GET_WORKSPACE_INVITATIONS_SUCCESS",
  GET_WORKSPACE_INVITATIONS_NOT_FOUND = "GET_WORKSPACE_INVITATIONS_NOT_FOUND",
  GET_WORKSPACE_INVITATIONS_HTTP_INTERNAL_ERROR = "GET_WORKSPACE_INVITATIONS_HTTP_INTERNAL_ERROR",
  GET_WORKSPACE_INVITATIONS_ERROR = "GET_WORKSPACE_INVITATIONS_ERROR",

  GET_WORKSPACE_SUCCESS = "GET_WORKSPACE_SUCCESS",
  GET_WORKSPACE_NOT_FOUND = "GET_WORKSPACE_NOT_FOUND",
  GET_WORKSPACE_HTTP_INTERNAL_ERROR = "GET_WORKSPACE_HTTP_INTERNAL_ERROR",
  GET_WORKSPACE_ERROR = "GET_WORKSPACE_ERROR",
}
