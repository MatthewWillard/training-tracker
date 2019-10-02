import jwtDecode from "jwt-decode";
import config from "../config";

let timeoutId;
const tenSecondsInMs = 10000;

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  parseJwt(jwt) {
    return jwtDecode(jwt);
  },
  readJwtToken() {
    return TokenService.parseJwt(TokenService.getAuthToken());
  },
  getMsUntilExpiry(payload) {
    return payload.exp * 1000 - Date.now();
  },
  queueCallbackBeforeExpiry(callback) {
    const msUntilExpiry = TokenService.getMsUntilExpiry(
      TokenService.readJwtToken()
    );
    timeoutId = setTimeout(callback, msUntilExpiry - tenSecondsInMs);
  },
  clearCallbackBeforeExpiry() {
    clearTimeout(timeoutId);
  }
};

export default TokenService;