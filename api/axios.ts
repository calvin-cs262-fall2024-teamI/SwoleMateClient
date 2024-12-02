import axios, { AxiosRequestConfig } from "axios";

const baseURL = "http://10.25.14.170:3000/api";

export const serviceAxios = axios.create({
  baseURL,
  timeout: 2000,
  withCredentials: false,
});

// request interceptor
serviceAxios.interceptors.request.use();

// response interceptor
serviceAxios.interceptors.response.use(
  response => {
    if (response.data.success) {
      response.data = response.data.data;
    }
    return response;
  },
  error => {
    console.error("err: " + error.response?.data?.msg); // for debug
    return Promise.reject(error);
  }
);

const getXXX = async <T>(
  path: string,
  params: {
    [key: string]: string | number | null | undefined;
  }
): Promise<T[]> => {
  const config: AxiosRequestConfig = {
    params,
  };

  const rsp = await serviceAxios.get(path, config);
  return rsp.data;
};

interface IUser {
  id: number;
  username: string;
  emailAddress: string;
}

export const getUsers = async ({ offset = 0, limit = 100 } = {}) =>
  getXXX<IUser>("/users/", { offset, limit });

export const postUser = async (user: IUser): Promise<IUser> => {
  const rsp = await serviceAxios.post("/users/", user);
  return rsp.data;
};

export const updateUser = async (id: number, user: IUser): Promise<IUser> => {
  const rsp = await serviceAxios.put(`/users/${id}`, user);
  return rsp.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await serviceAxios.delete(`/users/${id}/`);
};
