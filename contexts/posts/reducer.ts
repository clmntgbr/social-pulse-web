import { GetPost } from "@/store/client/interface/GetPost";
import { GetPosts } from "@/store/client/interface/GetPosts";
import { PostsAction } from "./actions";
import { PostsActionTypes } from "./types";

export type PostsState = {
  error: boolean;
  loading: boolean;
  posts: GetPosts | null;
  post: GetPost | null;
};

export const initialPostsState: PostsState = {
  error: false,
  loading: true,
  posts: null,
  post: null,
};

export function postsReducer(state: PostsState, action: PostsActionTypes): PostsState {
  switch (action.type) {
    case PostsAction.LOADING_START:
    case PostsAction.GET_POST_LOADING_START: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case PostsAction.LOADING_END:
    case PostsAction.GET_POST_LOADING_END: {
      return {
        ...state,
        loading: false,
      };
    }

    case PostsAction.GET_POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.payload,
      };
    }

    case PostsAction.GET_POST_SUCCESS: {
      return {
        ...state,
        post: action.payload,
      };
    }

    case PostsAction.GET_POSTS_ERROR:
    case PostsAction.GET_POSTS_HTTP_INTERNAL_ERROR:
    case PostsAction.GET_POSTS_NOT_FOUND:
    case PostsAction.GET_POST_ERROR:
    case PostsAction.GET_POST_HTTP_INTERNAL_ERROR:
    case PostsAction.GET_POST_NOT_FOUND: {
      return {
        ...state,
        error: true,
        posts: state.posts,
      };
    }

    default:
      return state;
  }
}
