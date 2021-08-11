import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  Method,
  AxiosInstance
} from "axios";

const server: AxiosInstance = axios.create({
  baseURL: "",
  timeout: 60000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
});

server.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError<any>) => {
    return Promise.reject(error);
  }
);

server.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const data = response.data;
    if (data.code === 0 || data.code === "0") {
      return response;
    } else {
      return Promise.reject(data.msg);
    }
  },
  (error: AxiosError<any>) => {
    return Promise.reject(error);
  }
);

async function http(
  method: Method,
  url: string,
  params: { [key: string]: any } = {},
  data: { [key: string]: any } = {}
) {
  const response = await server.request({
    method,
    url,
    params,
    data
  });
  return response.data;
}

export default http;
