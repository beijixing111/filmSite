export const _siteName_ = 'mimyz'; // 站点名称前缀
export const _userInfoKey_ = `_${_siteName_}_userInfo_`; //用户信息
export const _loginToken_ = `_${_siteName_}_token_`; // token信息
export const _timeout_ = 1000 * 60; // 接口等待时长

export const favoriteListKey = 'favoriteList'; //缓存收藏key

// 接口地址
export const baseUrl = 'https://mock.mengxuegu.com/mock/6396f57f2e0f396e51a5c570/mimyz_mock';
export const proUrl = 'https://mock.mengxuegu.com/mock/6396f57f2e0f396e51a5c570/mimyz_mock';

// 接口地址
export const getApiUrl = () => {
 return process.env.NODE_ENV === "development" ? baseUrl : proUrl;
}