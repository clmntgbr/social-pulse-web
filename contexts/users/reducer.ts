import { GetSocialAccounts } from "@/store/client/interface/GetSocialAccounts";
import { GetWorkspace } from "@/store/client/interface/GetWorkspace";
import { GetWorkspaces } from "@/store/client/interface/GetWorkspaces";
import { UserAction } from "./actions";
import { UserActionTypes } from "./types";

export type UserState = {
  error: boolean;
  loading: boolean;
  workspaces: GetWorkspaces | null;
  workspace: GetWorkspace | null;
  socialAccounts: GetSocialAccounts | null;
};

export const initialUserState: UserState = {
  error: false,
  loading: false,
  workspaces: null,
  workspace: null,
  socialAccounts: null,
};

export function userReducer(
  state: UserState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case UserAction.USER_LOADING_START: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case UserAction.USER_LOADING_END: {
      return {
        ...state,
        loading: false,
      };
    }

    case UserAction.GET_WORKSPACES_SUCCESS: {
      return {
        ...state,
        workspaces: action.payload,
      };
    }

    case UserAction.GET_SOCIAL_ACCOUNTS_SUCCESS: {
      return {
        ...state,
        socialAccounts: action.payload,
      };
    }

    case UserAction.GET_WORKSPACE_SUCCESS: {
      return {
        ...state,
        workspace: action.payload,
      };
    }

    case UserAction.GET_SOCIAL_ACCOUNTS_NOT_FOUND:
    case UserAction.GET_SOCIAL_ACCOUNTS_HTTP_INTERNAL_ERROR:
    case UserAction.GET_SOCIAL_ACCOUNTS_ERROR:

    case UserAction.GET_WORKSPACES_NOT_FOUND:
    case UserAction.GET_WORKSPACES_HTTP_INTERNAL_ERROR:
    case UserAction.GET_WORKSPACES_ERROR:

    case UserAction.GET_WORKSPACE_NOT_FOUND:
    case UserAction.GET_WORKSPACE_HTTP_INTERNAL_ERROR:
    case UserAction.GET_WORKSPACE_ERROR: {
      return {
        ...state,
        error: true,
        workspaces: null,
        workspace: null,
        socialAccounts: null,
      };
    }

    default:
      return state;
  }
}
