import { PublicationsAction } from "@/contexts/publications/actions";
import { PublicationsActionTypes } from "@/contexts/publications/types";
import { Dispatch } from "react";
import ApiClient from "../client/ApiClient";
import { PostPublications } from "../client/interface/body/PostPublications";
import { HttpStatus } from "../enums/HttpStatus";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function postPublications(token: string, body: PostPublications, dispatch: Dispatch<PublicationsActionTypes>): Promise<void> {
  try {
    dispatch({ type: PublicationsAction.PUBLICATIONS_LOADING_START });

    const client = new ApiClient(token);
    const response = await client.postPublications(body);

    if (response === null) {
      dispatch({
        type: PublicationsAction.POST_PUBLICATIONS_ERROR,
        payload: new HttpInternalServerError(PublicationsAction.POST_PUBLICATIONS_ERROR),
      });
      return;
    }

    switch (response.status) {
      case HttpStatus.CREATED:
        dispatch({
          type: PublicationsAction.POST_PUBLICATIONS_SUCCESS,
          payload: response.data,
        });
        break;

      case HttpStatus.NOT_FOUND:
        dispatch({
          type: PublicationsAction.POST_PUBLICATIONS_NOT_FOUND,
          payload: new HttpNotFoundError(PublicationsAction.POST_PUBLICATIONS_NOT_FOUND),
        });
        break;

      default:
        dispatch({
          type: PublicationsAction.POST_PUBLICATIONS_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(PublicationsAction.POST_PUBLICATIONS_HTTP_INTERNAL_ERROR),
        });
    }
  } catch {
    dispatch({
      type: PublicationsAction.POST_PUBLICATIONS_ERROR,
      payload: new Error(PublicationsAction.POST_PUBLICATIONS_ERROR),
    });
  } finally {
    dispatch({ type: PublicationsAction.PUBLICATIONS_LOADING_END });
  }
}
