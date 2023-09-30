import { request } from "./request";

export const getAllSchedule = async () => {
  return await request.get("api/schedules");
};
