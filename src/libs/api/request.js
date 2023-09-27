import Axios from "axios";
const baseURL = "http://localhost:5000/";
export const request = Axios.create({
  baseURL,
});
