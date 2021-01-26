import { api } from "../../Backend";
import Cookies from "js-cookie";

export const getData = () => {
  return fetch(`${api}get`, {
    method: "GET",
    mode: "cors",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const checkAuth = () => {
  const userEmail = Cookies.get("userEmail");
  return userEmail;
};
