import axios from "axios";
import { AuthHandler } from "../handlers/AuthHandler";

const axiosDefault = function () {
  const API_URL = "https://valley-e-commerce.herokuapp.com/v1/";
  return axios.create({
    baseURL: `${API_URL}`,
    headers: {
      authorization: `Bearer ${AuthHandler.getToken()}`,
      "Content-Type": "application/json",
    },
  });
};

export default axiosDefault;
