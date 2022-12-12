import { getStorage, setStorage, removeStorage } from '../common/storage'; 
import { favoriteListKey } from '../common/config';
import * as config from '../common/config/index';

// 缓存收藏列表
const cacheFavoriteList = (list) => {
  setStorage(favoriteListKey, list);
}

// 同步修改state 都是方法
// 第一个参数是state 第二个参数是需要修改的值

export default { 
  cacheFilmList(state, payload){
    state.filmList = payload;
  },
  addFilm(state, payload) {
    state.favoriteList.push(payload);
    cacheFavoriteList(state.favoriteList);
  }, 
  delFilm(state, payload) {
    // console.log(payload);
    let index = state.favoriteList.findIndex(item => item.id === payload.id);
    state.favoriteList.splice(index, 1);
    cacheFavoriteList(state.favoriteList);
  },
  clearFilm(state) {
    // 把过滤之后的数组传进来即可
    state.favoriteList = [];
    cacheFavoriteList([]);
  },
  login(state, payload) {
    // console.log(payload);
    setStorage(config._userInfoKey_, payload.userInfo);
    setStorage(config._loginToken_, 'Bearer ' + payload.token);
    state.favoriteList = getStorage(favoriteListKey) || [];
    state.userInfo = payload.userInfo;
  },
  logout(state) {
    removeStorage(config._userInfoKey_);
    removeStorage(config._loginToken_); 
    state.userInfo = {};
    state.favoriteList = [];
  }
}