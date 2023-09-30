import { request } from "./request";

export const getAllUser = async () => {
  return await request.get("api/users");
};

export const deleteUser = async (payload) => {
  return await request.post("api/users/delete-user", payload);
};

export const cash = async (payload) => {
  return await request.patch("api/users/cash", payload);
};

export const block = async (id) => {
  return await request.patch("api/users/block/" + id);
};

export const statis = async () => {
  return await request.get("api/users/statis");
};

export const getInfoUser = async (id) => {
  return await request.get("api/users/" + id);
};

export const changeInfo = async (payload) => {
  return await request.patch("api/users/change-info", payload);
};
