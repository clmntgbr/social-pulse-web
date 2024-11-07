import { SocialAccountsAction } from "@/contexts/social_accounts/actions";
import { SocialAccountsActionTypes } from "@/contexts/social_accounts/types";
import { Dispatch } from "react";
import { Default } from "../client/interface/Default";
import { PromiseResponse } from "../client/interface/PromiseResponse";
import SocialPulseClient from "../client/SocialPulseClient";
import { HTTP_STATUS } from "../enums/HTTP_STATUS";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function deleteSocialAccount(token: string, socialAccountUuid: string, dispatch: Dispatch<SocialAccountsActionTypes>): Promise<PromiseResponse> {
  try {
    dispatch({ type: SocialAccountsAction.LOADING_START });

    const client = new SocialPulseClient(token);
    const response = await client.deleteSocialAccount(socialAccountUuid);

    if (response === null) {
      dispatch({
        type: SocialAccountsAction.DELETE_SOCIAL_ACCOUNT_HTTP_INTERNAL_ERROR,
        payload: new HttpInternalServerError("Get plans failed"),
      });
      return Promise.reject({ status: false, message: null, data: null });
    }

    switch (response.status) {
      case HTTP_STATUS.NO_CONTENT:
        dispatch({
          type: SocialAccountsAction.DELETE_SOCIAL_ACCOUNT_SUCCESS,
          payload: response.data as Default,
        });
        return Promise.resolve({ status: true, message: null, data: response.data });

      case HTTP_STATUS.NOT_FOUND:
        dispatch({
          type: SocialAccountsAction.DELETE_SOCIAL_ACCOUNT_NOT_FOUND,
          payload: new HttpNotFoundError("Get plans not found"),
        });
        return Promise.reject({ status: false, message: response.response.data.message ?? null, data: null });

      default:
        dispatch({
          type: SocialAccountsAction.DELETE_SOCIAL_ACCOUNT_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(`Unexpected status: ${response.status}`),
        });
        return Promise.reject({ status: false, message: response.response.data.message ?? null, data: null });
    }
  } catch (error) {
    dispatch({
      type: SocialAccountsAction.DELETE_SOCIAL_ACCOUNT_ERROR,
      payload: error instanceof Error ? error : new Error("Get plans failed"),
    });
    return Promise.reject({ status: false, message: null, data: null });
  } finally {
    dispatch({ type: SocialAccountsAction.LOADING_END });
  }
}
