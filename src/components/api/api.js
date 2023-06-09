import axios from "axios";
import envInstants from "../../libs/configs/env";
import { useHistory } from "react-router-dom";

const apiExcept = "api/v1.0/auth/login";

const apiExcept2 = [
  "api/v1.0/auth/login",
  "api/v1.0/auth/refresh"
]

const x1 = apiExcept2.filter(x => x.indexOf(apiExcept) === -1)
if (x1.length === 0) {

}

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
});




instance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    const _url = error.response.config.url;
    console.log(_url);
    if (_url.indexOf(apiExcept) === -1) {
      if (error.response.status === 401) {
        localStorage.clear()
        // window.location = "/login";
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  }
);

export default instance;

export function setDefaultURL(url) {

  instance.defaults.baseURL = url;

}


