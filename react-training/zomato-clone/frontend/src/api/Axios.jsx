import axios from "axios";
const url = import.meta.env.VITE_APP_BASE_URL;

const instance = axios.create({
  //Base URL of entire project
  baseURL: url,
  //Helps to seralize params i.e stringify params
});

instance.interceptors.request.use(
  (config) => {
    //import token from local storage
    let token = localStorage.getItem("token") || "";
    //configuring header
    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, //based on your project requirement
    };

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
      localStorage.removeItem("token");
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
