import { SocialNetworksAction } from "@/contexts/social-networks/actions";
import { SocialNetworksActionTypes } from "@/contexts/social-networks/types";
import { Dispatch } from "react";
import ApiClient from "../client/ApiClient";
import { HttpStatus } from "../enums/HttpStatus";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function getSocialNetworks(token: string, dispatch: Dispatch<SocialNetworksActionTypes>): Promise<void> {
  try {
    dispatch({ type: SocialNetworksAction.SOCIAL_NETWORKS_LOADING_START });

    const client = new ApiClient(token);
    const response = await client.getSocialNetworks();

    if (response === null) {
      dispatch({
        type: SocialNetworksAction.GET_SOCIAL_NETWORKS_ERROR,
        payload: new HttpInternalServerError(SocialNetworksAction.GET_SOCIAL_NETWORKS_ERROR),
      });
      return;
    }

    switch (response.status) {
      case HttpStatus.OK:
        dispatch({
          type: SocialNetworksAction.GET_SOCIAL_NETWORKS_SUCCESS,
          payload: response.data,
        });
        break;

      case HttpStatus.NOT_FOUND:
        dispatch({
          type: SocialNetworksAction.GET_SOCIAL_NETWORKS_NOT_FOUND,
          payload: new HttpNotFoundError(SocialNetworksAction.GET_SOCIAL_NETWORKS_NOT_FOUND),
        });
        break;

      default:
        dispatch({
          type: SocialNetworksAction.GET_SOCIAL_NETWORKS_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(SocialNetworksAction.GET_SOCIAL_NETWORKS_HTTP_INTERNAL_ERROR),
        });
    }
  } catch {
    dispatch({
      type: SocialNetworksAction.GET_SOCIAL_NETWORKS_ERROR,
      payload: new Error(SocialNetworksAction.GET_SOCIAL_NETWORKS_ERROR),
    });
  } finally {
    dispatch({ type: SocialNetworksAction.SOCIAL_NETWORKS_LOADING_END });
  }
}
