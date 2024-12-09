import { SocialNetworksAction } from "@/contexts/social-networks/actions";
import { SocialNetworksActionTypes } from "@/contexts/social-networks/types";
import { Dispatch } from "react";
import ApiClient from "../client/ApiClient";
import { GetSocialNetworksConnect } from "../client/interface/GetSocialNetworksConnect";
import { HttpStatus } from "../enums/HttpStatus";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function getSocialNetworksConnect(
  token: string,
  socialNetworksType: string,
  pathname: string,
  dispatch: Dispatch<SocialNetworksActionTypes>
): Promise<GetSocialNetworksConnect | null> {
  try {
    dispatch({ type: SocialNetworksAction.SOCIAL_NETWORKS_LOADING_START });

    const client = new ApiClient(token);
    const response = await client.getSocialNetworksConnect(socialNetworksType, pathname);

    if (response === null) {
      dispatch({
        type: SocialNetworksAction.GET_SOCIAL_NETWORKS_CONNECT_ERROR,
        payload: new HttpInternalServerError(SocialNetworksAction.GET_SOCIAL_NETWORKS_CONNECT_ERROR),
      });
      return Promise.reject(null);
    }

    switch (response.status) {
      case HttpStatus.OK:
        dispatch({
          type: SocialNetworksAction.GET_SOCIAL_NETWORKS_CONNECT_SUCCESS,
          payload: response.data,
        });
        return Promise.resolve(response.data);

      case HttpStatus.NOT_FOUND:
        dispatch({
          type: SocialNetworksAction.GET_SOCIAL_NETWORKS_CONNECT_NOT_FOUND,
          payload: new HttpNotFoundError(SocialNetworksAction.GET_SOCIAL_NETWORKS_CONNECT_NOT_FOUND),
        });
        return Promise.reject(null);

      default:
        dispatch({
          type: SocialNetworksAction.GET_SOCIAL_NETWORKS_CONNECT_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(SocialNetworksAction.GET_SOCIAL_NETWORKS_CONNECT_HTTP_INTERNAL_ERROR),
        });
        return Promise.reject(null);
    }
  } catch {
    dispatch({
      type: SocialNetworksAction.GET_SOCIAL_NETWORKS_CONNECT_ERROR,
      payload: new Error(SocialNetworksAction.GET_SOCIAL_NETWORKS_CONNECT_ERROR),
    });
    return Promise.reject(null);
  } finally {
    dispatch({ type: SocialNetworksAction.SOCIAL_NETWORKS_LOADING_END });
  }
}
