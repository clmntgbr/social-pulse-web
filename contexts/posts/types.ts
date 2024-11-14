import { GetPost } from "@/store/client/interface/GetPost";
import { GetPosts } from "@/store/client/interface/GetPosts";
import { SetErrorAction, SetHttpInternalServerErrorAction, SetNotFoundErrorAction } from "../ActionErrorTypes";
import { PostsAction } from "./actions";

export type SetPostsLoadingStartAction = {
  type: PostsAction.LOADING_START;
};
export type SetPostsLoadingEndAction = {
  type: PostsAction.LOADING_END;
};

export type SetGetPostLoadingStartAction = {
  type: PostsAction.GET_POST_LOADING_START;
};
export type SetGetPostLoadingEndAction = {
  type: PostsAction.GET_POST_LOADING_END;
};

// Get Posts

export type GetPostsSuccessAction = {
  type: PostsAction.GET_POSTS_SUCCESS;
  payload: GetPosts;
};
export type GetPostsNotFoundAction = SetNotFoundErrorAction<PostsAction.GET_POSTS_NOT_FOUND>;
export type GetPostsHttpInternalErrorAction = SetHttpInternalServerErrorAction<PostsAction.GET_POSTS_HTTP_INTERNAL_ERROR>;
export type GetPostsErrorAction = SetErrorAction<PostsAction.GET_POSTS_ERROR>;

// Get Post

export type GetPostSuccessAction = {
  type: PostsAction.GET_POST_SUCCESS;
  payload: GetPost;
};
export type GetPostNotFoundAction = SetNotFoundErrorAction<PostsAction.GET_POST_NOT_FOUND>;
export type GetPostHttpInternalErrorAction = SetHttpInternalServerErrorAction<PostsAction.GET_POST_HTTP_INTERNAL_ERROR>;
export type GetPostErrorAction = SetErrorAction<PostsAction.GET_POST_ERROR>;

export type PostsActionTypes =
  | SetGetPostLoadingStartAction
  | SetGetPostLoadingEndAction
  | SetPostsLoadingStartAction
  | SetPostsLoadingEndAction
  | GetPostsSuccessAction
  | GetPostsNotFoundAction
  | GetPostsHttpInternalErrorAction
  | GetPostsErrorAction
  | GetPostSuccessAction
  | GetPostNotFoundAction
  | GetPostHttpInternalErrorAction
  | GetPostErrorAction;
