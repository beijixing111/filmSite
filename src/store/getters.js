

export default {
  getFavoriteTotal(state) {
    return state.favoriteList.length;
  },
  getUserIsLogin(state) {
    return !!state.userInfo.userName;
  }
}