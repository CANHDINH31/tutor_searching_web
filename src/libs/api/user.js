import { request } from "./request";

export const getAllUser = async () => {
  return await request.get("api/users");
};
