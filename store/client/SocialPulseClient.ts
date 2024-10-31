import axios, { AxiosResponse, type AxiosInstance } from "axios";
import { PatchUserWorkspace } from "./interface/body/PatchUserWorkspace";
import { PostLogin } from "./interface/body/PostLogin";
import { PostWorkspaces } from "./interface/body/PostWorkspaces";
import { GetLogin } from "./interface/GetLogin";
import { GetLoginUrl } from "./interface/GetLoginUrl";
import { GetSocialAccounts } from "./interface/GetSocialAccounts";
import { GetUser } from "./interface/GetUser";
import { GetWorkspace } from "./interface/GetWorkspace";
import { GetWorkspaces } from "./interface/GetWorkspaces";
import { SOCIAL_ACCOUNTS, USERS, WORKSPACES } from "./RoutesEnum";

export default class SocialPulseClient {
  private httpClient: AxiosInstance;

  constructor(token?: string | null) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    this.httpClient = axios.create({
      baseURL: "http://localhost:9000/api",
      timeout: 1000,
      headers,
    });
  }

  public async getWorkspaces(): Promise<AxiosResponse<GetWorkspaces> | null> {
    try {
      return await this.httpClient.get(WORKSPACES.GET_WORKSPACES);
    } catch {
      return null;
    }
  }

  public async postWorkspaces(requestBody: PostWorkspaces): Promise<AxiosResponse<GetWorkspaces> | null> {
    try {
      return await this.httpClient.post(WORKSPACES.POST_WORKSPACES, requestBody);
    } catch {
      return null;
    }
  }

  public async getWorkspace(): Promise<AxiosResponse<GetWorkspace> | null> {
    try {
      return await this.httpClient.get(WORKSPACES.GET_WORKSPACE);
    } catch {
      return null;
    }
  }

  public async getSocialAccounts(): Promise<AxiosResponse<GetSocialAccounts> | null> {
    try {
      return await this.httpClient.get(SOCIAL_ACCOUNTS.GET_SOCIAL_ACCOUNTS);
    } catch {
      return null;
    }
  }

  public async getFacebookLoginUrl(): Promise<AxiosResponse<GetLoginUrl> | null> {
    try {
      return await this.httpClient.get(SOCIAL_ACCOUNTS.GET_FACEBOOK_LOGIN_URL);
    } catch {
      return null;
    }
  }

  public async getTwitterLoginUrl(): Promise<AxiosResponse<GetLoginUrl> | null> {
    try {
      return await this.httpClient.get(SOCIAL_ACCOUNTS.GET_TWITTER_LOGIN_URL);
    } catch {
      return null;
    }
  }

  public async getLinkedinLoginUrl(): Promise<AxiosResponse<GetLoginUrl> | null> {
    try {
      return await this.httpClient.get(SOCIAL_ACCOUNTS.GET_LINKEDIN_LOGIN_URL);
    } catch {
      return null;
    }
  }

  public async getUser(): Promise<AxiosResponse<GetUser> | null> {
    try {
      return await this.httpClient.get(USERS.GET_USER);
    } catch {
      return null;
    }
  }

  public async postLogin(requestBody: PostLogin): Promise<AxiosResponse<GetLogin> | null> {
    return await this.httpClient.post(USERS.POST_LOGIN, requestBody);
  }

  public async patchUserWorkspace(requestBody: PatchUserWorkspace): Promise<AxiosResponse<GetWorkspace> | null> {
    try {
      return await this.httpClient.patch(USERS.PATCH_USER_WORKSPACE, requestBody);
    } catch {
      return null;
    }
  }
}
