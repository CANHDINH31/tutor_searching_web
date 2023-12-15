import Axios from "axios";
const baseURL = "http://localhost:5000/";
export const request = Axios.create({
  baseURL,
});

function authRequestInterceptor(config) {
  const _token = localStorage.getItem("access_token");

  if (_token && _token !== "undefined" && config.headers) {
    config.headers.authorization = _token;
  }

  return config;
}

request.interceptors.request.use(authRequestInterceptor);
