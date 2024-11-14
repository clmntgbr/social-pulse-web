"use client";

import { getPosts } from "@/store/posts/getPosts";
import { useSession } from "next-auth/react";
import React, { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { initialPostsState, postsReducer, PostsState } from "./reducer";
import { PostsActionTypes } from "./types";

export type PostsContextType = {
  posts: PostsState;
  postsDispatch: Dispatch<PostsActionTypes>;
};

export const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [posts, postsDispatch] = useReducer(postsReducer, initialPostsState);
  const { data: session } = useSession();

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
      (
        window as {
          postsDispatch?: Dispatch<PostsActionTypes>;
        }
      ).postsDispatch = postsDispatch;
    }
  }, [postsDispatch]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (session !== undefined && session !== null) {
        await getPosts(session?.accessToken ?? "", postsDispatch);
      }
    };

    fetchPosts();
  }, [session]);

  return <PostsContext.Provider value={{ posts, postsDispatch }}>{children}</PostsContext.Provider>;
};
