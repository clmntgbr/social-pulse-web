import { Default } from "@/store/client/interface/Default";
import { GetFullWorkspaces } from "@/store/client/interface/GetFullWorkspaces";
import { GetWorkspace } from "@/store/client/interface/GetWorkspace";
import { GetWorkspaceInvitation } from "@/store/client/interface/GetWorkspaceInvitation";
import { GetWorkspaceInvitations } from "@/store/client/interface/GetWorkspaceInvitations";
import { GetWorkspaces } from "@/store/client/interface/GetWorkspaces";
import { WorkspaceInvitationFull } from "@/store/client/interface/workspace-invitation-full";
import { SetErrorAction, SetHttpInternalServerErrorAction, SetNotFoundErrorAction } from "../ActionErrorTypes";
import { WorkspacesAction } from "./actions";

// Get Workspaces

export type SetWorkspacesLoadingStartAction = {
  type: WorkspacesAction.WORKSPACES_LOADING_START;
};
export type SetWorkspacesLoadingEndAction = {
  type: WorkspacesAction.WORKSPACES_LOADING_END;
};

export type SetLoadingStartAction = {
  type: WorkspacesAction.LOADING_START;
};
export type SetLoadingEndAction = {
  type: WorkspacesAction.LOADING_END;
};

/// Get Workspaces

export type GetWorkspacesSuccessAction = {
  type: WorkspacesAction.GET_WORKSPACES_SUCCESS;
  payload: GetWorkspaces;
};

export type GetWorkspacesNotFoundAction = SetNotFoundErrorAction<WorkspacesAction.GET_WORKSPACES_NOT_FOUND>;

export type GetWorkspacesHttpInternalErrorAction = SetHttpInternalServerErrorAction<WorkspacesAction.GET_WORKSPACES_HTTP_INTERNAL_ERROR>;

export type GetWorkspacesErrorAction = SetErrorAction<WorkspacesAction.GET_WORKSPACES_ERROR>;

/// Get Full Workspaces

export type GetFullWorkspacesSuccessAction = {
  type: WorkspacesAction.GET_WORKSPACES_FULL_SUCCESS;
  payload: GetFullWorkspaces;
};

export type GetFullWorkspacesNotFoundAction = SetNotFoundErrorAction<WorkspacesAction.GET_WORKSPACES_FULL_NOT_FOUND>;

export type GetFullWorkspacesHttpInternalErrorAction = SetHttpInternalServerErrorAction<WorkspacesAction.GET_WORKSPACES_FULL_HTTP_INTERNAL_ERROR>;

export type GetFullWorkspacesErrorAction = SetErrorAction<WorkspacesAction.GET_WORKSPACES_FULL_ERROR>;

/// Get Workspace

export type GetWorkspaceSuccessAction = {
  type: WorkspacesAction.GET_WORKSPACE_SUCCESS;
  payload: GetWorkspace;
};

export type GetWorkspaceNotFoundAction = SetNotFoundErrorAction<WorkspacesAction.GET_WORKSPACE_NOT_FOUND>;

export type GetWorkspaceHttpInternalErrorAction = SetHttpInternalServerErrorAction<WorkspacesAction.GET_WORKSPACE_HTTP_INTERNAL_ERROR>;

export type GetWorkspaceErrorAction = SetErrorAction<WorkspacesAction.GET_WORKSPACE_ERROR>;

/// Post Workspaces

export type PostWorkspacesSuccessAction = {
  type: WorkspacesAction.POST_WORKSPACES_SUCCESS;
  payload: GetWorkspaces;
};

export type PostWorkspacesNotFoundAction = SetNotFoundErrorAction<WorkspacesAction.POST_WORKSPACES_NOT_FOUND>;

export type PostWorkspacesHttpInternalErrorAction = SetHttpInternalServerErrorAction<WorkspacesAction.POST_WORKSPACES_HTTP_INTERNAL_ERROR>;

export type PostWorkspacesErrorAction = SetErrorAction<WorkspacesAction.POST_WORKSPACES_ERROR>;

/// Delete Workspace User

export type DeleteWorkspaceUserSuccessAction = {
  type: WorkspacesAction.DELETE_WORKSPACE_USER_SUCCESS;
  payload: Default;
};
export type DeleteWorkspaceUserNotFoundAction = SetNotFoundErrorAction<WorkspacesAction.DELETE_WORKSPACE_USER_NOT_FOUND>;
export type DeleteWorkspaceUserHttpInternalErrorAction = SetHttpInternalServerErrorAction<WorkspacesAction.DELETE_WORKSPACE_USER_HTTP_INTERNAL_ERROR>;
export type DeleteWorkspaceUserErrorAction = SetErrorAction<WorkspacesAction.DELETE_WORKSPACE_USER_ERROR>;

/// Post Workspace Promote

export type PostWorkspacePromoteSuccessAction = {
  type: WorkspacesAction.POST_WORKSPACE_PROMOTE_SUCCESS;
  payload: Default;
};
export type PostWorkspacePromoteNotFoundAction = SetNotFoundErrorAction<WorkspacesAction.POST_WORKSPACE_PROMOTE_NOT_FOUND>;
export type PostWorkspacePromoteHttpInternalErrorAction = SetHttpInternalServerErrorAction<WorkspacesAction.POST_WORKSPACE_PROMOTE_HTTP_INTERNAL_ERROR>;
export type PostWorkspacePromoteErrorAction = SetErrorAction<WorkspacesAction.POST_WORKSPACE_PROMOTE_ERROR>;

/// Patch Workspace

export type PatchWorkspaceSuccessAction = {
  type: WorkspacesAction.PATCH_WORKSPACE_SUCCESS;
  payload: Default;
};
export type PatchWorkspaceNotFoundAction = SetNotFoundErrorAction<WorkspacesAction.PATCH_WORKSPACE_NOT_FOUND>;
export type PatchWorkspaceHttpInternalErrorAction = SetHttpInternalServerErrorAction<WorkspacesAction.PATCH_WORKSPACE_HTTP_INTERNAL_ERROR>;
export type PatchWorkspaceErrorAction = SetErrorAction<WorkspacesAction.PATCH_WORKSPACE_ERROR>;

/// Post Workspace Invitation

export type PostWorkspaceInvitationSuccessAction = {
  type: WorkspacesAction.POST_WORKSPACE_INVITATION_SUCCESS;
  payload: WorkspaceInvitationFull;
};

export type PostWorkspaceInvitationNotFoundAction = SetNotFoundErrorAction<WorkspacesAction.POST_WORKSPACE_INVITATION_NOT_FOUND>;

export type PostWorkspaceInvitationHttpInternalErrorAction = SetHttpInternalServerErrorAction<WorkspacesAction.POST_WORKSPACE_INVITATION_HTTP_INTERNAL_ERROR>;

export type PostWorkspaceInvitationErrorAction = SetErrorAction<WorkspacesAction.POST_WORKSPACE_INVITATION_ERROR>;

/// Patch Workspace Invitation

export type PatchWorkspaceInvitationSuccessAction = {
  type: WorkspacesAction.PATCH_WORKSPACE_INVITATION_SUCCESS;
  payload: GetWorkspaceInvitation;
};
export type PatchWorkspaceInvitationNotFoundAction = SetNotFoundErrorAction<WorkspacesAction.PATCH_WORKSPACE_INVITATION_NOT_FOUND>;
export type PatchWorkspaceInvitationHttpInternalErrorAction = SetHttpInternalServerErrorAction<WorkspacesAction.PATCH_WORKSPACE_INVITATION_HTTP_INTERNAL_ERROR>;
export type PatchWorkspaceInvitationErrorAction = SetErrorAction<WorkspacesAction.PATCH_WORKSPACE_INVITATION_ERROR>;

/// Get Workspace Invitations

export type GetWorkspaceInvitationsSuccessAction = {
  type: WorkspacesAction.GET_WORKSPACE_INVITATIONS_SUCCESS;
  payload: GetWorkspaceInvitations;
};

export type GetWorkspaceInvitationsNotFoundAction = SetNotFoundErrorAction<WorkspacesAction.GET_WORKSPACE_INVITATIONS_NOT_FOUND>;

export type GetWorkspaceInvitationsHttpInternalErrorAction = SetHttpInternalServerErrorAction<WorkspacesAction.GET_WORKSPACE_INVITATIONS_HTTP_INTERNAL_ERROR>;

export type GetWorkspaceInvitationsErrorAction = SetErrorAction<WorkspacesAction.GET_WORKSPACE_INVITATIONS_ERROR>;

export type WorkspacesActionTypes =
  | SetLoadingStartAction
  | SetLoadingEndAction
  | SetWorkspacesLoadingStartAction
  | SetWorkspacesLoadingEndAction
  | GetFullWorkspacesSuccessAction
  | GetFullWorkspacesNotFoundAction
  | GetFullWorkspacesHttpInternalErrorAction
  | GetFullWorkspacesErrorAction
  | GetWorkspacesSuccessAction
  | GetWorkspacesNotFoundAction
  | GetWorkspacesHttpInternalErrorAction
  | GetWorkspacesErrorAction
  | GetWorkspaceSuccessAction
  | GetWorkspaceNotFoundAction
  | GetWorkspaceHttpInternalErrorAction
  | GetWorkspaceErrorAction
  | DeleteWorkspaceUserSuccessAction
  | DeleteWorkspaceUserNotFoundAction
  | DeleteWorkspaceUserHttpInternalErrorAction
  | DeleteWorkspaceUserErrorAction
  | PostWorkspacePromoteSuccessAction
  | PostWorkspacePromoteNotFoundAction
  | PostWorkspacePromoteHttpInternalErrorAction
  | PostWorkspacePromoteErrorAction
  | PostWorkspacesSuccessAction
  | PostWorkspacesNotFoundAction
  | PostWorkspacesHttpInternalErrorAction
  | PostWorkspacesErrorAction
  | PostWorkspaceInvitationSuccessAction
  | PostWorkspaceInvitationNotFoundAction
  | PostWorkspaceInvitationHttpInternalErrorAction
  | PostWorkspaceInvitationErrorAction
  | PatchWorkspaceInvitationSuccessAction
  | PatchWorkspaceInvitationNotFoundAction
  | PatchWorkspaceInvitationHttpInternalErrorAction
  | PatchWorkspaceInvitationErrorAction
  | PatchWorkspaceSuccessAction
  | PatchWorkspaceNotFoundAction
  | PatchWorkspaceHttpInternalErrorAction
  | PatchWorkspaceErrorAction
  | GetWorkspaceInvitationsSuccessAction
  | GetWorkspaceInvitationsNotFoundAction
  | GetWorkspaceInvitationsHttpInternalErrorAction
  | GetWorkspaceInvitationsErrorAction;
