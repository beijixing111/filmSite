import { createStore } from 'vuex';
import { Toast } from 'vant';
import { favoriteListKey } from '../common/config';
import { getStorage, setStorage, clearStorage } from '../common/utils'; 
import * as config from '../common/config/index';

// 收藏接口未开发好, 收藏数据暂存本地
// 模拟请求时间
const testTime = 300; //毫秒

const runToast = (msg, time = 3) => {
  Toast({
    message: msg,
    position: 'top',
    duration: time * 1000
  });
}

// 缓存收藏列表
const cacheFavoriteList = (list) => {
  setStorage(favoriteListKey, list);
}

export default createStore({
  state: {
    userInfo: getStorage(config._userInfoKey_) || {},
    filmList: [], // 已加载的filmList
    favoriteList: getStorage(favoriteListKey) || []
  },
  getters: {
    getFavoriteTotal(state) {
      return state.favoriteList.length;
    },
    getUserIsLogin(state) {
      return !!state.userInfo.userName;
    }
  },
  // 同步修改state 都是方法
  // 第一个参数是state 第二个参数是需要修改的值
  mutations: {  
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
      console.log(payload);
      setStorage(config._userInfoKey_, payload.userInfo);
      setStorage(config._loginToken_, 'Bearer ' + payload.token);
      state.userInfo = payload.userInfo;
    },
    logout(state) {
      clearStorage(config._userInfoKey_);
      clearStorage(config._loginToken_);
      state.userInfo = {};
    }
  }, 
  actions: {
    addFavorite(store, params) {
      console.log(params);
      setTimeout(() => { 
        store.commit('addFilm', params);
        runToast('收藏成功！');
      }, testTime)
    },
    removeFavorite(store, params) {
      setTimeout(() => { 
        store.commit('delFilm', params);
        runToast('取消收藏！');
      }, testTime)
    },
    clearFavorite(store) {
      setTimeout(() => { 
        store.commit('clearFilm');
        runToast('已删除全部收藏！');
      }, testTime)
    }
  }, 
  modules: {
  }
})
