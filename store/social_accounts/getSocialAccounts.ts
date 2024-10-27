import { SocialAccountsAction } from "@/contexts/social_accounts/actions";
import { SocialAccountsActionTypes } from "@/contexts/social_accounts/types";
import { Dispatch } from "react";
import { GetSocialAccounts } from "../client/interface/GetSocialAccounts";
import SocialPulseClient from "../client/SocialPulseClient";
import { HTTP_STATUS } from "../enums/HTTP_STATUS";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function getSocialAccounts(
  token: string,
  dispatch: Dispatch<SocialAccountsActionTypes>
): Promise<void> {
  try {
    dispatch({ type: SocialAccountsAction.SOCIAL_ACCOUNTS_LOADING_START });

    const client = new SocialPulseClient(token);
    const response = await client.getSocialAccounts();

    if (response === null) {
      dispatch({
        type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_HTTP_INTERNAL_ERROR,
        payload: new HttpInternalServerError("Get plans failed"),
      });
      return;
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        dispatch({
          type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_SUCCESS,
          payload: response.data as GetSocialAccounts,
        });
        break;

      case HTTP_STATUS.NOT_FOUND:
        dispatch({
          type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_NOT_FOUND,
          payload: new HttpNotFoundError("Get plans not found"),
        });
        break;

      default:
        dispatch({
          type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(
            `Unexpected status: ${response.status}`
          ),
        });
    }
  } catch (error) {
    dispatch({
      type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_ERROR,
      payload: error instanceof Error ? error : new Error("Get plans failed"),
    });
  } finally {
    dispatch({ type: SocialAccountsAction.SOCIAL_ACCOUNTS_LOADING_END });
  }
}
