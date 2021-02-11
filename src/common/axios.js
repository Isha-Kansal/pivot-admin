import axois from "axios";
import { config } from "../config";

export const apiCallPost = async (url, data) => {
  const authToken = localStorage.getItem("auth_token");
  let backendUrl = config.apiUrlInnow8;

  let content = "application/json";

  return await axois
    .post(`${backendUrl}/${url}`, data, {
      headers: {
        "Content-Type": content,
        Accept: "application/json",
        Authorization: `Bearer ${authToken || ""}`,
      },
    })
    .then((res) => {
      return res;
    });
};
export const apiCallGet = async (url) => {
  const authToken = localStorage.getItem("auth_token");
  let backendUrl = config.apiUrlInnow8;

  return await axois
    .get(`${backendUrl}/${url}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken || ""}`,
      },
    })
    .then((res) => {
      return res;
    });
};
