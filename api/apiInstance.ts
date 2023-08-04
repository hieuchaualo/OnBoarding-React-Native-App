/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import axios from "axios";
import { getItemAsync, deleteItemAsync } from 'expo-secure-store';
import { API_BASE_URI } from "../constants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URI,
  timeout: 5 * 1000, // 5 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosUploadFileInstance = axios.create({
  baseURL: API_BASE_URI,
  timeout: 5 * 1000, // 5 seconds
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

axiosInstance.interceptors.request.use(async config => {
  const token = await getItemAsync('secure_token');
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error?.response?.data?.statusCode === 401) {
      await deleteItemAsync('secure_token');
    }
    return error?.response?.data;
  }
);

export { axiosInstance, axiosUploadFileInstance };
