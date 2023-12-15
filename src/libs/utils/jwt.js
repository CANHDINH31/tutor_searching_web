import { request } from "../api/request";

const setToken = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("access_token", accessToken);
    request.defaults.headers.common.authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("access_token");
    delete request.defaults.headers.common.authorization;
  }
};

const clearToken = () => {
  setToken("");
};

export { setToken, clearToken };
