import { PostsAction } from "@/contexts/posts/actions";
import { PostsActionTypes } from "@/contexts/posts/types";
import { Dispatch } from "react";
import { GetPosts } from "../client/interface/GetPosts";
import SocialPulseClient from "../client/SocialPulseClient";
import { HTTP_STATUS } from "../enums/HTTP_STATUS";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function getPosts(token: string, dispatch: Dispatch<PostsActionTypes>): Promise<void> {
  try {
    dispatch({ type: PostsAction.LOADING_START });

    const client = new SocialPulseClient(token);
    const response = await client.getPosts();

    if (response === null) {
      dispatch({
        type: PostsAction.GET_POSTS_HTTP_INTERNAL_ERROR,
        payload: new HttpInternalServerError("Get plans failed"),
      });
      return;
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        dispatch({
          type: PostsAction.GET_POSTS_SUCCESS,
          payload: response.data as GetPosts,
        });
        break;

      case HTTP_STATUS.NOT_FOUND:
        dispatch({
          type: PostsAction.GET_POSTS_NOT_FOUND,
          payload: new HttpNotFoundError("Get plans not found"),
        });
        break;

      default:
        dispatch({
          type: PostsAction.GET_POSTS_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(`Unexpected status: ${response.status}`),
        });
    }
  } catch (error) {
    dispatch({
      type: PostsAction.GET_POSTS_ERROR,
      payload: error instanceof Error ? error : new Error("Get plans failed"),
    });
  } finally {
    dispatch({ type: PostsAction.LOADING_END });
  }
}
