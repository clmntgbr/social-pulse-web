import { SocialAccountsActionTypes } from "@/contexts/social_accounts/types";
import { getFacebookLoginUrl } from "@/store/social_accounts/getFacebookLoginUrl";
import { getLinkedinLoginUrl } from "@/store/social_accounts/getLinkedinLoginUrl";
import { getTwitterLoginUrl } from "@/store/social_accounts/getTwitterLoginUrl";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ToastFail } from "./library/Toast";

export const onFacebookLoginUrl = async (accessToken: string, pathname: string, socialAccountsDispatch: React.Dispatch<SocialAccountsActionTypes>, router: AppRouterInstance) => {
  getFacebookLoginUrl(accessToken, pathname, socialAccountsDispatch)
    .then((response) => {
      router.push(response?.value ?? "");
    })
    .catch(() => {
      ToastFail("Something went wrong.", "There was a problem with your request.");
    });
};

export const onTwitterLoginUrl = async (accessToken: string, pathname: string, socialAccountsDispatch: React.Dispatch<SocialAccountsActionTypes>, router: AppRouterInstance) => {
  getTwitterLoginUrl(accessToken, pathname, socialAccountsDispatch)
    .then((response) => {
      router.push(response?.value ?? "");
    })
    .catch(() => {
      ToastFail("Something went wrong.", "There was a problem with your request.");
    });
};

export const onLinkedinLoginUrl = async (accessToken: string, pathname: string, socialAccountsDispatch: React.Dispatch<SocialAccountsActionTypes>, router: AppRouterInstance) => {
  getLinkedinLoginUrl(accessToken, pathname, socialAccountsDispatch)
    .then((response) => {
      router.push(response?.value ?? "");
    })
    .catch(() => {
      ToastFail("Something went wrong.", "There was a problem with your request.");
    });
};
