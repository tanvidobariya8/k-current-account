import axios from "axios";
import { AADHAAR_OTP_VERIFY_RESPONSE } from "./mockresponse";

const API = axios.create({
  withCredentials: true,
});

API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const requestURL = error.config.url;
    let response;
    console.log("error::::::::", error.config.data);
    switch (requestURL) {
      case "http://localhost:8081/api/current-account/next-step":
        response = AADHAAR_OTP_VERIFY_RESPONSE;
      default:
        console.log("No Matching URL");
    }
    if (response) {
      console.log(requestURL, "-->", response);
      return Promise.resolve(response);
    }
    return Promise.reject(error);
  }
);

export default API;
