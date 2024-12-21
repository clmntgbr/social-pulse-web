import { PublicationsAction } from "@/contexts/publications/actions";
import { PublicationsActionTypes } from "@/contexts/publications/types";
import { Dispatch } from "react";
import ApiClient from "../client/ApiClient";
import { GetPublication } from "../client/interface/GetPublication";
import { HttpStatus } from "../enums/HttpStatus";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function getPublication(token: string, uuid: string, dispatch: Dispatch<PublicationsActionTypes>): Promise<GetPublication> {
  try {
    dispatch({ type: PublicationsAction.PUBLICATIONS_LOADING_START });

    const client = new ApiClient(token);
    const response = await client.getPublication(uuid);

    if (response === null) {
      dispatch({
        type: PublicationsAction.GET_PUBLICATION_ERROR,
        payload: new HttpInternalServerError(PublicationsAction.GET_PUBLICATION_ERROR),
      });
      return Promise.reject(null);
    }

    switch (response.status) {
      case HttpStatus.OK:
        dispatch({
          type: PublicationsAction.GET_PUBLICATION_SUCCESS,
          payload: response.data,
        });
        return Promise.resolve(response.data);

      case HttpStatus.NOT_FOUND:
        dispatch({
          type: PublicationsAction.GET_PUBLICATION_NOT_FOUND,
          payload: new HttpNotFoundError(PublicationsAction.GET_PUBLICATION_NOT_FOUND),
        });
        return Promise.reject(null);

      default:
        dispatch({
          type: PublicationsAction.GET_PUBLICATION_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(PublicationsAction.GET_PUBLICATION_HTTP_INTERNAL_ERROR),
        });
        return Promise.reject(null);
    }
  } catch {
    dispatch({
      type: PublicationsAction.GET_PUBLICATION_ERROR,
      payload: new Error(PublicationsAction.GET_PUBLICATION_ERROR),
    });
    return Promise.reject(null);
  } finally {
    dispatch({ type: PublicationsAction.PUBLICATIONS_LOADING_END });
  }
}
