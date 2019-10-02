import axios from 'axios';
import { message } from 'antd';

export const rq = axios.create({
  timeout: 2000,
});

let token = '';

rq.interceptors.request.use(config => {
  if (!token) {
    const t = window.localStorage.getItem('token');
    if (t) {
      token = t;
    }
  }

  if (token) {
    // tslint:disable-next-line: no-string-literal
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

rq.interceptors.response.use(response => {
  return response;
}, error => {
  message.error(error.response.data.message || '服务器开小差了');
  return Promise.reject(error);
});
