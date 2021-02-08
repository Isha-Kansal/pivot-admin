import { LOGIN_BY_ADMIN_REQUEST } from "./types";

export const loginByAdmin = (url, body, callback) => {
  return {
    type: LOGIN_BY_ADMIN_REQUEST,
    url,
    payload: body,
    callback,
  };
};
