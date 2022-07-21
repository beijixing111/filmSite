/** 
 * http配置
 */
 import axios from 'axios' 
 import { Toast } from 'vant';
 import { getApiUrl, _timeout_, _siteName_, _loginToken_ } from './config';
 import { getStorage } from '../common/utils'
 
 // axios 配置
 axios.defaults.timeout = _timeout_;
 axios.defaults.withCredentials = true;
 Toast.setDefaultOptions({ duration: 3000 }); 
 axios.defaults.baseURL = getApiUrl();
 
 const Indicator = {};
 
 // 是否显示loading动画
 // function showIndicator(bool) {
 // 	if(!bool) {
 // 		return false;
 // 	}
 // 	Indicator = Toast.loading({
 // 		message: '加载中...',
 // 		forbidClick: true,
 // 		duration: 0
 // 	});
 // }
 
 export const CancelToken = axios.CancelToken;
  
 // http request 拦截器
 axios.interceptors.request.use(
  config => {  
    let randomNum = Math.random().toString().slice(-10)
    config.headers.requestid = randomNum;
    config.headers.siteName = _siteName_; 
    let Authorization = getStorage(_loginToken_, 1, false); 
    config.headers.Authorization =  Authorization;
    if ( config.url.indexOf('login') > -1) {
      config.headers.Authorization = '';
    }  
    // console.log(config);  
    // showIndicator(config.data.isShowIndicator); 
    return config;
  },
  err => {
    return Promise.reject(err);
  });
 
 // http response 拦截器
axios.interceptors.response.use(
  response => {
    Indicator.clear && Indicator.clear(); // loading 结束 
    if (typeof response.data === 'string') {
      document.write(response.data);
    }
    
    return response;
  },
  err => {
    Indicator.clear && Indicator.clear(); // 结束loading加载
    // console.log(err);
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          Toast('请求错误(400)')
          err.response.data.errorMessage
          break 
        case 401:   
          console.log(err.response.data.errorMessage);
          break;
        case 403:
          Toast('拒绝访问(403)')
          break

        case 404:
          Toast(`请求地址出错 ${err.response.config.url}`)
          break

        case 408:
          Toast('请求超时(408)')
          break

        case 500:
          Toast('服务器内部错误(500)')
          break

        case 501:
          Toast('服务未实现(501)')
          break

        case 502:
          Toast('网关错误(502)')
          break

        case 503:
          Toast('服务不可用(503)')
          break

        case 504:
          Toast('网关超时(504)')
          break

        case 505:
          Toast('HTTP版本不受支持(505)')
          break

        default:
      }
    }

  return Promise.reject(err)
});
 
 export default axios;
 