import axios from 'axios';
import { Toast } from '@douyinfe/semi-ui';
import NProgress from 'nprogress';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
});
const successfulStatusCode = 200;
const badStatusHandler = {
  400(response) {
    const {
      data: { message },
    } = response;

    Toast.error(message);
  },
  401() {
    Toast.error('未登录');
  },
  404() {
    Toast.error('接口地址不存在');
  },
};

instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    NProgress.start();
    return config;
  },
  (error) => {
    // Do something with request error
    NProgress.done();

    Toast.error('发送请求时发生了错误');

    return Promise.error(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    NProgress.done();

    if (response.status !== successfulStatusCode) {
      return Promise.reject(response);
    }

    return Promise.resolve(response.data);
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    NProgress.done();

    const { message, response } = error;
    const map = {
      'Network Error': '网络错误',
    };

    if (!response) {
      Toast.error(map[message] ?? message);
      return Promise.reject(error);
    }

    const { status } = response;
    if (!status) {
      return;
    }

    const handler = badStatusHandler[status];
    if (!handler) {
      Toast.error(`找不到状态码 ${status} 的处理程序`);
      return Promise.reject(error);
    }

    handler(response);

    return Promise.reject(error);
  }
);

export function get(path, params) {
  return instance.get(path, { params });
}

export function post(path, data) {
  return instance.post(path, data);
}
