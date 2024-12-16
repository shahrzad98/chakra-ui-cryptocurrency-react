import axios from 'axios';
import qs from 'qs';
import * as constants from './constants';
import { GetURL } from './urlMap';
import TokenManager from './TokenManager';

import { ReduxStore } from '../reduxStore';
import { setBlur } from '../containers/BlurredModal/actions';
import CaptchaPrompt from '../components/Captcha/CaptchaPrompt';

function parseError(messages) {
  // error
  if (messages) {
    if (messages instanceof Array) {
      return Promise.reject({ messages: messages });
    } else {
      return Promise.reject({ messages: [messages] });
    }
  } else {
    return Promise.reject({ messages: ['Uncaught error'] });
  }
}

/**
 * axios instance
 */
const instance = axios.create({
  baseURL: constants.API_SERVER,
  paramsSerializer: function (params) {
    return qs.stringify(params, { indices: false });
  },
});
// const request = <T>(method: Method, url: string, params: any): Promise<AxiosResponse> => {
//   return api.request({
//     method,
//     url,
//     params,
//   });
// };

// request header
instance.interceptors.request.use(
  config => {
    // Do something before request is sent

    if (localStorage.getItem('access_token')) {
      config.headers = {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      };
    }
    config.withCredentials = true;

    config.headers['Accept-Language'] = localStorage.getItem('lang') == 'fa' ? 'fa-IR' : 'en-US';

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// response parse
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // return Promise.reject(error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // check for refresh token
          return new Promise<void>((resolve, reject) => {
            if (TokenManager.get().RefreshToken) {
              axios
                .post(GetURL('refresh-token'), {
                  refresh_token: TokenManager.get().RefreshToken,
                })
                .then(response => {
                  TokenManager.set(response.data.data);
                  resolve();
                  // window.location.reload();
                })
                .catch(error => {
                  //
                  return reject(error);
                });
            }
            // return Promise.caller();
          });

        case 403:
          TokenManager.clear();
          break;

        default:
          switch (error?.response?.data?.error?.code) {
            case constants.MUST_SOLVE_CAPTCHA:
              // prompt for captcha
              ReduxStore.getInstance()
                .get()
                .dispatch(
                  setBlur(CaptchaPrompt, {
                    message: error.response.data.error?.message,
                  }),
                );
              break;
            default:
            // ReduxStore.getInstance()
            //   .get()
            //   .dispatch(
            //     showToast(
            //       error?.response?.data?.error?.message,
            //       'bottom',
            //       'error',
            //     ),
            //   );
          }

        // return Promise.reject(error.response);
      }
      return parseError(error.response);
    } else {
      return Promise.reject(error);
    }
  },
);

export const api = instance;
