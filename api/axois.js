import axios from 'axios';
import {api} from '../screens/config/env';

const baseURL = `${api}`;

const service = axios.create({
  baseURL,
  headers: {Accept: 'application/json'},
});

service?.interceptors?.response.use(
  async (res) => {
    return res?.data;
  },
  async (err) => {
    return Promise.reject(err?.response?.data);
  },
);

service?.interceptors?.request.use((req) => {
  return req;
});

export default service;
