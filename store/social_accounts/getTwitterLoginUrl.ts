import { SocialAccountsAction } from "@/contexts/social_accounts/actions";
import { SocialAccountsActionTypes } from "@/contexts/social_accounts/types";
import { Dispatch } from "react";
import { GetLoginUrl } from "../client/interface/GetLoginUrl";
import SocialPulseClient from "../client/SocialPulseClient";
import { HTTP_STATUS } from "../enums/HTTP_STATUS";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function getTwitterLoginUrl(token: string, callback: string, dispatch: Dispatch<SocialAccountsActionTypes>): Promise<GetLoginUrl | null> {
  try {
    dispatch({ type: SocialAccountsAction.LOGIN_URL_LOADING_START });

    const client = new SocialPulseClient(token);
    const response = await client.getTwitterLoginUrl(callback);

    if (response === null) {
      dispatch({
        type: SocialAccountsAction.GET_TWITTER_LOGIN_URL_HTTP_INTERNAL_ERROR,
        payload: new HttpInternalServerError("Get plans failed"),
      });
      return Promise.reject(null);
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        dispatch({
          type: SocialAccountsAction.GET_TWITTER_LOGIN_URL_SUCCESS,
          payload: response.data,
        });
        return Promise.resolve(response.data);

      case HTTP_STATUS.NOT_FOUND:
        dispatch({
          type: SocialAccountsAction.GET_TWITTER_LOGIN_URL_NOT_FOUND,
          payload: new HttpNotFoundError("Get plans not found"),
        });
        return Promise.reject(null);

      default:
        dispatch({
          type: SocialAccountsAction.GET_TWITTER_LOGIN_URL_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(`Unexpected status: ${response.status}`),
        });
        return Promise.reject(null);
    }
  } catch (error) {
    dispatch({
      type: SocialAccountsAction.GET_TWITTER_LOGIN_URL_ERROR,
      payload: error instanceof Error ? error : new Error("Get plans failed"),
    });
    return Promise.reject(null);
  } finally {
    dispatch({ type: SocialAccountsAction.LOGIN_URL_LOADING_END });
  }
}
