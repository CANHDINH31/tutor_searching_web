import { request } from "./request";

export const login = async (payload) => {
  return await request.post("api/auth/login", payload);
};
