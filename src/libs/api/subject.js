import { request } from "./request";

export const getAllSubject = async () => {
  return await request.get("api/subjects");
};

export const addSubject = async (payload) => {
  return await request.post("api/subjects", payload);
};

export const updateSubject = async (id, payload) => {
  return await request.patch("api/subjects/" + id, payload);
};

export const removeSubject = async (id) => {
  return await request.patch("api/subjects/soft-delete/" + id);
};
