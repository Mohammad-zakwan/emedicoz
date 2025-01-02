import axios from 'axios';
import Store from '../redux/Store';

// export const API_BASE_URL = "http://dev.emedicoz.com/qa/emedicoz-api";
export const API_BASE_URL = "https://dev.emedicoz.com/staging/emedicoz-api";
//export const API_BASE_URL = "https://dev.emedicoz.com/development/emedicoz-api";
// export const API_BASE_URL = 'https://d85g0bvcnm0si.cloudfront.net';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Content: 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const state = Store.getState();

    // console.log("STATE->",state?.auth?.user)

    const {Authorization, member_id, learning_center_detail} =
      state?.auth;
    // console.log('Authorization===>', Authorization);
    if (Authorization) {
      config.headers['Authorization_Key'] = Authorization;
      config.headers['center_id'] = learning_center_detail;
      config.headers['app_version'] = '56';
      config.headers['device_type'] = '1';
      config.headers['device_token'] = '';
      // console.log('Headers======>', config.headers);
      config.headers['member_id'] = member_id;
    }
    // if (member_id) {
    // }
    // console.log(config.headers)
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
