import { getStorage } from '../common/storage'; 
import { favoriteListKey } from '../common/config';
import * as config from '../common/config/index';

const getFavoriteList = () => {
  if(!getStorage(config._userInfoKey_)) return [];
  return getStorage(favoriteListKey) || [];
}

const state = {
  userInfo: getStorage(config._userInfoKey_) || {},
  filmList: [], // 已加载的filmList
  favoriteList: getFavoriteList()
}

export default state;