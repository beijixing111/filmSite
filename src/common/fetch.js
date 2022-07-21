import axios, { CancelToken } from './axiosPlus';
import qs from 'qs';

// form data格式
export function post(apiName, params) {
  return new Promise((resolve, reject) => { 
    let path = apiName;  
    axios.post(path, qs.stringify(params))
    .then(res => {
      resolve(res.data);
    }).catch(err => {
      console.log(err);
      reject(err)
    })
  })
}

// application/json 方式
export function postJSON(apiName, params, cancelTokenObj) {
  return new Promise((resolve, reject) => { 
    cancelTokenObj = cancelTokenObj ? {cancelToken: new CancelToken(cancelTokenObj.cancelToken)} : {};
    axios.post(apiName, params, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      ...cancelTokenObj
    })
    .then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export function get(path, params = {}, cancelTokenObj) {
  return new Promise((resolve, reject) => {
    // const path = apiName.indexOf('/api') !== -1 ? url + apiName : apiName
    cancelTokenObj = cancelTokenObj ? {cancelToken: new CancelToken(cancelTokenObj.cancelToken)} : {};
    axios.get(path, { 
      params: params,
      ...cancelTokenObj
    })
    .then(res => {
      resolve(res.data);
    }).catch(err => {
      console.log(err);
      reject(err)
    })
  })
}
