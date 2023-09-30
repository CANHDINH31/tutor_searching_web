import { request } from "./request";

export const login = async (payload) => {
  return await request.post("api/auth/login", payload);
};

export const register = async (payload) => {
  return await request.post("api/auth/register", payload);
};
