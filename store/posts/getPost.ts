import { PostsAction } from "@/contexts/posts/actions";
import { PostsActionTypes } from "@/contexts/posts/types";
import { Dispatch } from "react";
import { GetPost } from "../client/interface/GetPost";
import SocialPulseClient from "../client/SocialPulseClient";
import { HTTP_STATUS } from "../enums/HTTP_STATUS";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

interface PromiseResponse {
  status: boolean;
  message: string | null;
  data: GetPost | null;
}

export async function getPost(token: string, groupUuid: string, dispatch: Dispatch<PostsActionTypes>): Promise<PromiseResponse> {
  try {
    dispatch({ type: PostsAction.GET_POST_LOADING_START });

    const client = new SocialPulseClient(token);
    const response = await client.getPost(groupUuid);

    if (response === null) {
      dispatch({
        type: PostsAction.GET_POST_HTTP_INTERNAL_ERROR,
        payload: new HttpInternalServerError("Get plans failed"),
      });
      return Promise.reject({ status: false, message: null, data: null });
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        dispatch({
          type: PostsAction.GET_POST_SUCCESS,
          payload: response.data,
        });
        return Promise.resolve({ status: true, message: null, data: response.data });

      case HTTP_STATUS.NOT_FOUND:
        dispatch({
          type: PostsAction.GET_POST_NOT_FOUND,
          payload: new HttpNotFoundError("Get plans not found"),
        });
        return Promise.reject({ status: false, message: null, data: null });

      default:
        dispatch({
          type: PostsAction.GET_POST_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(`Unexpected status: ${response.status}`),
        });
        return Promise.reject({ status: false, message: null, data: null });
    }
  } catch (error) {
    dispatch({
      type: PostsAction.GET_POST_ERROR,
      payload: error instanceof Error ? error : new Error("Get plans failed"),
    });
    return Promise.reject({ status: false, message: null, data: null });
  } finally {
    dispatch({ type: PostsAction.GET_POST_LOADING_END });
  }
}
