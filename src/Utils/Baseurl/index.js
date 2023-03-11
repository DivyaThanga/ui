import axios from "axios";

// const mode = "dev"
const mode = "staging";
// const mode = "prod"

const baseValues = {
  baseProtocol: {
    dev: "http://",
    staging: "http://",
    prod: "https://",
  },
  baseHost: {
    dev: "",
    staging: "109.123.240.89:8003/",
    prod: "",
  },
};

const baseProtocol = baseValues.baseProtocol[mode];
const baseHost = baseValues.baseHost[mode];

const HTTP = axios.create({
  baseURL: baseProtocol + baseHost,
});

HTTP.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      let tokenData = JSON.parse(localStorage.getItem("tokens"));
      let payload = {
        // access:tokenData.access,
        refresh: tokenData.refresh,
      };
      let apiResponse = await axios.post(
        "https://labglo-cms-staging.herokuapp.com/users/token/refresh/",
        payload
      );
      localStorage.setItem("tokens", JSON.stringify(apiResponse.data));
    } else {
      return Promise.reject(error);
    }
  }
);

export default HTTP;
