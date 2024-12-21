import { GetPublication } from "@/store/client/interface/GetPublication";
import { GetPublications } from "@/store/client/interface/GetPublications";
import { SetErrorAction, SetHttpInternalServerErrorAction, SetNotFoundErrorAction } from "../ActionErrorTypes";
import { PublicationsAction } from "./actions";

export type SetLoadingStartAction = {
  type: PublicationsAction.PUBLICATIONS_LOADING_START;
};
export type SetLoadingEndAction = {
  type: PublicationsAction.PUBLICATIONS_LOADING_END;
};

/// Get Publications

export type GetPublicationsSuccessAction = {
  type: PublicationsAction.GET_PUBLICATIONS_SUCCESS;
  payload: GetPublications;
};
export type GetPublicationsNotFoundAction = SetNotFoundErrorAction<PublicationsAction.GET_PUBLICATIONS_NOT_FOUND>;
export type GetPublicationsHttpInternalErrorAction = SetHttpInternalServerErrorAction<PublicationsAction.GET_PUBLICATIONS_HTTP_INTERNAL_ERROR>;
export type GetPublicationsErrorAction = SetErrorAction<PublicationsAction.GET_PUBLICATIONS_ERROR>;

/// Get Publication

export type GetPublicationSuccessAction = {
  type: PublicationsAction.GET_PUBLICATION_SUCCESS;
  payload: GetPublication;
};
export type GetPublicationNotFoundAction = SetNotFoundErrorAction<PublicationsAction.GET_PUBLICATION_NOT_FOUND>;
export type GetPublicationHttpInternalErrorAction = SetHttpInternalServerErrorAction<PublicationsAction.GET_PUBLICATION_HTTP_INTERNAL_ERROR>;
export type GetPublicationErrorAction = SetErrorAction<PublicationsAction.GET_PUBLICATION_ERROR>;

/// Post Publications

export type PostPublicationsSuccessAction = {
  type: PublicationsAction.POST_PUBLICATIONS_SUCCESS;
  payload: GetPublications;
};
export type PostPublicationsNotFoundAction = SetNotFoundErrorAction<PublicationsAction.POST_PUBLICATIONS_NOT_FOUND>;
export type PostPublicationsHttpInternalErrorAction = SetHttpInternalServerErrorAction<PublicationsAction.POST_PUBLICATIONS_HTTP_INTERNAL_ERROR>;
export type PostPublicationsErrorAction = SetErrorAction<PublicationsAction.POST_PUBLICATIONS_ERROR>;

export type PublicationsActionTypes =
  | SetLoadingStartAction
  | SetLoadingEndAction
  | GetPublicationsSuccessAction
  | GetPublicationsNotFoundAction
  | GetPublicationsHttpInternalErrorAction
  | GetPublicationsErrorAction
  | GetPublicationSuccessAction
  | GetPublicationNotFoundAction
  | GetPublicationHttpInternalErrorAction
  | GetPublicationErrorAction
  | PostPublicationsSuccessAction
  | PostPublicationsNotFoundAction
  | PostPublicationsHttpInternalErrorAction
  | PostPublicationsErrorAction;
