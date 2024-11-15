import { jwtDecode, JwtPayload } from "jwt-decode";

export const decodeToken = (bearerToken: string) => {
  if (!bearerToken) {
    return null;
  }

  try {
    const token = bearerToken.startsWith("Bearer ") ? bearerToken.slice(7) : bearerToken;
    const decoded = jwtDecode(token);
    return decoded;
  } catch {
    return null;
  }
};

export const isTokenValid = (token: JwtPayload) => {
  try {
    const currentTime = Math.floor(Date.now() / 1000);
    if (token.exp && token.exp > currentTime) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};
