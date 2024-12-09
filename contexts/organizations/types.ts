import { GetOrganization } from "@/store/client/interface/GetOrganization";
import { GetOrganizations } from "@/store/client/interface/GetOrganizations";
import { SetErrorAction, SetHttpInternalServerErrorAction, SetNotFoundErrorAction } from "../ActionErrorTypes";
import { OrganizationsAction } from "./actions";

export type SetLoadingStartAction = {
  type: OrganizationsAction.ORGANIZATIONS_LOADING_START;
};
export type SetLoadingEndAction = {
  type: OrganizationsAction.ORGANIZATIONS_LOADING_END;
};

// Get Organizations

export type GetOrganizationsSuccessAction = {
  type: OrganizationsAction.GET_ORGANIZATIONS_SUCCESS;
  payload: GetOrganizations;
};
export type GetOrganizationsNotFoundAction = SetNotFoundErrorAction<OrganizationsAction.GET_ORGANIZATIONS_NOT_FOUND>;
export type GetOrganizationsHttpInternalErrorAction = SetHttpInternalServerErrorAction<OrganizationsAction.GET_ORGANIZATIONS_HTTP_INTERNAL_ERROR>;
export type GetOrganizationsErrorAction = SetErrorAction<OrganizationsAction.GET_ORGANIZATIONS_ERROR>;

// Post Organizations

export type PostOrganizationsSuccessAction = {
  type: OrganizationsAction.POST_ORGANIZATIONS_SUCCESS;
  payload: GetOrganizations;
};
export type PostOrganizationsNotFoundAction = SetNotFoundErrorAction<OrganizationsAction.POST_ORGANIZATIONS_NOT_FOUND>;
export type PostOrganizationsHttpInternalErrorAction = SetHttpInternalServerErrorAction<OrganizationsAction.POST_ORGANIZATIONS_HTTP_INTERNAL_ERROR>;
export type PostOrganizationsErrorAction = SetErrorAction<OrganizationsAction.POST_ORGANIZATIONS_ERROR>;

// Get Organization

export type GetOrganizationSuccessAction = {
  type: OrganizationsAction.GET_ORGANIZATION_SUCCESS;
  payload: GetOrganization;
};
export type GetOrganizationNotFoundAction = SetNotFoundErrorAction<OrganizationsAction.GET_ORGANIZATION_NOT_FOUND>;
export type GetOrganizationHttpInternalErrorAction = SetHttpInternalServerErrorAction<OrganizationsAction.GET_ORGANIZATION_HTTP_INTERNAL_ERROR>;
export type GetOrganizationErrorAction = SetErrorAction<OrganizationsAction.GET_ORGANIZATION_ERROR>;

export type OrganizationsActionTypes =
  | SetLoadingStartAction
  | SetLoadingEndAction
  | GetOrganizationsSuccessAction
  | GetOrganizationsNotFoundAction
  | GetOrganizationsHttpInternalErrorAction
  | GetOrganizationsErrorAction
  | PostOrganizationsSuccessAction
  | PostOrganizationsNotFoundAction
  | PostOrganizationsHttpInternalErrorAction
  | PostOrganizationsErrorAction
  | GetOrganizationSuccessAction
  | GetOrganizationNotFoundAction
  | GetOrganizationHttpInternalErrorAction
  | GetOrganizationErrorAction;
