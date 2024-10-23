import axios from "axios";
const url = import.meta.env.VITE_APP_BASE_URL;

const instance = axios.create({
  //Base URL of entire project
  baseURL: url,
  //Helps to seralize params i.e stringify params
});

instance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token") || "";

    // Only set Content-Type to application/json if not sending FormData
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    // Always set Accept and Authorization headers
    config.headers.Accept = "application/json";
    config.headers.Authorization = `${token}`; // Based on your project requirement

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    //success status
    if (response.status === 200) {
      return response;
    }
    if (response.status === 201) {
      return response;
    }
    //error status
    else {
      const messages = response.data.messages;
      if (messages) {
        if (messages instanceof Array) {
          return Promise.reject({ messages });
        }
        return Promise.reject({ messages: [messages] });
      }
      return Promise.reject({ messages: ["got errors"] });
    }
  },
  (error) => {
    //unauthorised error
    if (error.response && error.response.status === 401) {
      console.log("user not verify");
      // localStorage.removeItem("token");
    }
    //internal server error
    else if (error.response && error.response.status === 500) {
      return Promise.reject(error.response);
    }
    //any other error
    else return Promise.reject(error);
  }
);
export const api = instance;

export default api;
