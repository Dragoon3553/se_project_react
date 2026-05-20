import { baseUrl, headers, handleServerResponse } from "./api";

export const signup = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      avatar,
      email,
      password,
    }),
  }).then(handleServerResponse);
};

export const signin = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(handleServerResponse);
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      headers,
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};
