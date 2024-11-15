import axios, { AxiosResponse, type AxiosInstance } from "axios";
import { LoginCredentials } from "./interface/body/LoginCredentials";
import { GetToken } from "./interface/GetToken";
import { GetUser } from "./interface/GetUser";
import { USERS } from "./RoutesEnum";

export default class ApiClient {
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

  public async getUser(): Promise<AxiosResponse<GetUser> | null> {
    try {
      return await this.httpClient.get(USERS.GET_USER);
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
}
