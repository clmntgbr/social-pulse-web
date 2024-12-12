import { SocialNetworksAction } from "@/contexts/social-networks/actions";
import { SocialNetworksActionTypes } from "@/contexts/social-networks/types";
import { Dispatch } from "react";
import ApiClient from "../client/ApiClient";
import { GetSocialNetworks } from "../client/interface/GetSocialNetworks";
import { HttpStatus } from "../enums/HttpStatus";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function postSocialNetworksValidate(
  token: string,
  code: string,
  body: string[],
  dispatch: Dispatch<SocialNetworksActionTypes>
): Promise<GetSocialNetworks | null> {
  try {
    dispatch({ type: SocialNetworksAction.SOCIAL_NETWORKS_LOADING_START });

    const client = new ApiClient(token);
    const response = await client.postSocialNetworksValidate(code, body);

    if (response === null) {
      dispatch({
        type: SocialNetworksAction.POST_SOCIAL_NETWORKS_VALIDATE_ERROR,
        payload: new HttpInternalServerError(SocialNetworksAction.POST_SOCIAL_NETWORKS_VALIDATE_ERROR),
      });
      return Promise.reject(null);
    }

    switch (response.status) {
      case HttpStatus.OK:
        dispatch({
          type: SocialNetworksAction.POST_SOCIAL_NETWORKS_VALIDATE_SUCCESS,
          payload: response.data,
        });
        return Promise.resolve(response.data);

      case HttpStatus.NOT_FOUND:
        dispatch({
          type: SocialNetworksAction.POST_SOCIAL_NETWORKS_VALIDATE_NOT_FOUND,
          payload: new HttpNotFoundError(SocialNetworksAction.POST_SOCIAL_NETWORKS_VALIDATE_NOT_FOUND),
        });
        return Promise.reject(null);

      default:
        dispatch({
          type: SocialNetworksAction.POST_SOCIAL_NETWORKS_VALIDATE_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(SocialNetworksAction.POST_SOCIAL_NETWORKS_VALIDATE_HTTP_INTERNAL_ERROR),
        });
        return Promise.reject(null);
    }
  } catch {
    dispatch({
      type: SocialNetworksAction.POST_SOCIAL_NETWORKS_VALIDATE_ERROR,
      payload: new Error(SocialNetworksAction.POST_SOCIAL_NETWORKS_VALIDATE_ERROR),
    });
    return Promise.reject(null);
  } finally {
    dispatch({ type: SocialNetworksAction.SOCIAL_NETWORKS_LOADING_END });
  }
}
