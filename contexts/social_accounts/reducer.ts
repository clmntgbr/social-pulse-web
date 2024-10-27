import { GetSocialAccounts } from "@/store/client/interface/GetSocialAccounts";
import { SocialAccountsAction } from "./actions";
import { SocialAccountsActionTypes } from "./types";

export type SocialAccountsState = {
  error: boolean;
  loading: boolean;
  socialAccounts: GetSocialAccounts | null;
};

export const initialSocialAccountsState: SocialAccountsState = {
  error: false,
  loading: false,
  socialAccounts: null,
};

export function socialAccountsReducer(
  state: SocialAccountsState,
  action: SocialAccountsActionTypes
): SocialAccountsState {
  switch (action.type) {
    case SocialAccountsAction.SOCIAL_ACCOUNTS_LOADING_START: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case SocialAccountsAction.SOCIAL_ACCOUNTS_LOADING_END: {
      return {
        ...state,
        loading: false,
      };
    }

    case SocialAccountsAction.GET_SOCIAL_ACCOUNTS_SUCCESS: {
      return {
        ...state,
        socialAccounts: action.payload,
      };
    }

    case SocialAccountsAction.GET_SOCIAL_ACCOUNTS_NOT_FOUND:
    case SocialAccountsAction.GET_SOCIAL_ACCOUNTS_HTTP_INTERNAL_ERROR:
    case SocialAccountsAction.GET_SOCIAL_ACCOUNTS_ERROR: {
      return {
        ...state,
        error: true,
        socialAccounts: null,
      };
    }

    default:
      return state;
  }
}
