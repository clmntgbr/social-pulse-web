import { GetOrganization } from "@/store/client/interface/GetOrganization";
import { GetOrganizations } from "@/store/client/interface/GetOrganizations";
import { OrganizationsAction } from "./actions";
import { OrganizationsActionTypes } from "./types";

export type OrganizationsState = {
  error: boolean;
  loading: boolean;
  organization: GetOrganization | null;
  organizations: GetOrganizations;
};

export const initialOrganizationsState: OrganizationsState = {
  error: false,
  loading: true,
  organization: null,
  organizations: [],
};

export function organizationsReducer(state: OrganizationsState, action: OrganizationsActionTypes): OrganizationsState {
  switch (action.type) {
    case OrganizationsAction.ORGANIZATIONS_LOADING_START: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case OrganizationsAction.ORGANIZATIONS_LOADING_END: {
      return {
        ...state,
        loading: false,
      };
    }

    case OrganizationsAction.GET_ORGANIZATIONS_SUCCESS: {
      return {
        ...state,
        organizations: action.payload,
      };
    }

    case OrganizationsAction.GET_ORGANIZATION_SUCCESS: {
      return {
        ...state,
        organization: action.payload,
      };
    }

    case OrganizationsAction.GET_ORGANIZATIONS_ERROR:
    case OrganizationsAction.GET_ORGANIZATIONS_HTTP_INTERNAL_ERROR:
    case OrganizationsAction.GET_ORGANIZATIONS_NOT_FOUND:
    case OrganizationsAction.GET_ORGANIZATION_ERROR:
    case OrganizationsAction.GET_ORGANIZATION_HTTP_INTERNAL_ERROR:
    case OrganizationsAction.GET_ORGANIZATION_NOT_FOUND: {
      return {
        ...state,
        error: true,
      };
    }

    default:
      return state;
  }
}
