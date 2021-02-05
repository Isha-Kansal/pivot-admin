import axois from "axios";
import { config } from "../config";

export const apiCallPost = async (url, data) => {
  let backendUrl = config.apiUrlInnow8;

  let content = "application/json";

  return await axois
    .post(`${backendUrl}/${url}`, data, {
      headers: {
        "Content-Type": content,
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    });
};
export const apiCallGet = async (url) => {
  let backendUrl = config.apiUrlInnow8;

  return await axois
    .get(`${backendUrl}/${url}`, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    });
};
