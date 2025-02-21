import axios, { AxiosResponse, type AxiosInstance } from "axios";
import https from "https";
import { LoginCredentials } from "./interface/body/LoginCredentials";
import { PostOrganizations } from "./interface/body/PostOgarnizations";
import { PostPublications } from "./interface/body/PostPublications";
import { GetSocialNetworksConnect } from "./interface/GetSocialNetworksConnect";
import { GetToken } from "./interface/GetToken";
import { ORGANIZATIONS, PUBLICATIONS, SOCIAL_NETWORKS, USERS } from "./RoutesEnum";

export default class ApiClient {
  private httpClient: AxiosInstance;

  constructor(token?: string | null) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    this.httpClient = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}api`,
      timeout: 50000,
      httpsAgent: agent,
      headers,
    });
  }

  public async getUser(): Promise<AxiosResponse<any> | null> {
    try {
      return await this.httpClient.get(USERS.GET_USER);
    } catch {
      return null;
    }
  }

  public async patchUserActiveOrganization(uuid: string): Promise<AxiosResponse<any> | null> {
    try {
      return await this.httpClient.patch(USERS.PATCH_USERS_ACTIVE_ORGANIZATION.replace("{uuid}", uuid));
    } catch {
      return null;
    }
  }

  public async getToken(requestBody: LoginCredentials): Promise<AxiosResponse<GetToken> | null> {
    try {
      return await this.httpClient.post(USERS.GET_LOGIN, requestBody);
    } catch {
      return null;
    }
  }

  public async getSocialNetworks(): Promise<AxiosResponse<any> | null> {
    try {
      return await this.httpClient.get(SOCIAL_NETWORKS.GET_SOCIAL_NETWORKS.concat("?status=active"));
    } catch {
      return null;
    }
  }

  public async getSocialNetworksByCode(code: string): Promise<AxiosResponse<any> | null> {
    try {
      return await this.httpClient.get(SOCIAL_NETWORKS.GET_SOCIAL_NETWORKS.concat("?validate=").concat(code).concat("&status=").concat("temporary"));
    } catch {
      return null;
    }
  }

  public async postSocialNetworksValidate(code: string, body: string[]): Promise<AxiosResponse<any> | null> {
    try {
      return await this.httpClient.post(SOCIAL_NETWORKS.POST_SOCIAL_NETWORKS_VALIDATE.replace("{code}", code), body);
    } catch {
      return null;
    }
  }

  public async getSocialNetworksConnect(socialNetworksType: string, pathname: string): Promise<AxiosResponse<GetSocialNetworksConnect> | null> {
    try {
      return await this.httpClient.get(
        SOCIAL_NETWORKS.GET_SOCIAL_NETWORKS_CONNECT.replace("{socialNetworksType}", socialNetworksType).replace("{pathname}", pathname)
      );
    } catch {
      return null;
    }
  }

  public async getOrganizations(): Promise<AxiosResponse<any> | null> {
    try {
      return await this.httpClient.get(ORGANIZATIONS.GET_ORGANIZATIONS);
    } catch {
      return null;
    }
  }

  public async getOrganization(): Promise<AxiosResponse<any> | null> {
    try {
      return await this.httpClient.get(ORGANIZATIONS.GET_ORGANIZATION);
    } catch {
      return null;
    }
  }

  public async postOrganizations(body: PostOrganizations): Promise<AxiosResponse<any> | null> {
    try {
      return await this.httpClient.post(ORGANIZATIONS.POST_ORGANIZATIONS, body);
    } catch {
      return null;
    }
  }

  public async getPublications(): Promise<AxiosResponse<any> | null> {
    try {
      return await this.httpClient.get(PUBLICATIONS.GET_PUBLICATIONS);
    } catch {
      return null;
    }
  }

  public async getPublication(uuid: string): Promise<AxiosResponse<any> | null> {
    try {
      return await this.httpClient.get(PUBLICATIONS.GET_PUBLICATION.replace("{uuid}", uuid));
    } catch {
      return null;
    }
  }

  public async deletePublication(uuid: string): Promise<AxiosResponse<any> | null> {
    try {
      return await this.httpClient.get(PUBLICATIONS.DELETE_PUBLICATION.replace("{uuid}", uuid));
    } catch {
      return null;
    }
  }

  public async postPublications(body: PostPublications): Promise<AxiosResponse<any> | null> {
    try {
      return await this.httpClient.post(PUBLICATIONS.POST_PUBLICATIONS, body);
    } catch {
      return null;
    }
  }
}
