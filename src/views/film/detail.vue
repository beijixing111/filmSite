<template>
  <div class="film-detail"> 
    <div v-if="!loading">
      <MimyzVideo 
        :videoId="filmData.id"
        :videoUrl='filmData.filmUrl'
        :videoOptions="filmData.poster ? {poster: filmData.poster} : {}"
        @play="onPlay"
        @fullScreenPlay="onFullScreen"
      />
      <div class="film-desc">
        <div class="fav-box">
          <Favorite :favId='filmData.id' :favFilmName='filmData.filmName' :favNum='filmData.filmHeat' />
        </div>
        <div class="userinfo">
          <van-image class="img-box"
            round lazy-load :src="filmData.mimyz_user.avatar || posterUrl" fit="cover"
          />
          <div class="nickname">
            <span>{{filmData.mimyz_user.nickName}}</span>
          </div>
        </div>
        <h3 class="title">电影名：{{filmData.filmName}}</h3>  
        <p>电影类型：<FilmType :type='4 || filmData.filmType' /></p>
        <!-- <p>资源类型：{{filmType}}</p> -->
        <p>电影简介：</p>
        <p class="indent">{{filmData.filmDesc || '无'}}</p>
      </div>
    </div>
  </div>
</template>

<script setup> 
import { ref } from 'vue'; 
import { useRoute } from 'vue-router';
// import { useStore } from 'vuex';
import { Toast } from 'vant';
import * as Api from './api';  
import MimyzVideo from '@/components/video/index';
import Favorite from './components/Favorite';
import FilmType from './components/FilmType';

// const store = useStore();
const route = useRoute(); 
let loading = ref(true);
let filmData = ref(null); 
const filmType = ref('');

const getVideoSuffix = (filmUrl) => { 
  if(!filmUrl) return '';
  let suffixIndex = filmUrl.lastIndexOf('.');
  return filmUrl.substr(suffixIndex + 1);
}

const detailData = async () => {
  // loading.value = true; 
  let res = await Api.getFilmDetail(id);
  // console.log(res);
  if(res.errorCode == 0) { 
    filmData.value = res.data; 
    filmType.value = getVideoSuffix(res.data.filmUrl);
    document.title = '电影：' + res.data.filmName;
  }
  loading.value = false;
}

let { detail } = route.query;
let { id } = route.params;
// console.log(id);
if(detail){
  detail = JSON.parse(decodeURIComponent(detail));
  // console.log(detail);
  filmData.value = detail; 
  filmType.value = getVideoSuffix(detail.filmUrl);  
  document.title = '电影：' + detail.filmName;
  loading.value = false;
} else {
  if(process.env.NODE_ENV === 'development'){
    Toast('模拟接口不再实现');
  } else {
    detailData();
  }
}


// const filmData = store.state.filmList.find(item => item.id === Number(id));

const onPlay = () => {
  console.log("播放");
}
const onFullScreen = () => {
  Toast({message: '由于手机端设备限制，请手动全屏观看！', position: 'bottom'});
}

</script>

<style lang="scss" scoped> 
.film-detail{
  min-height: 100vh;
  overflow: auto;
  background: #f8f8f8;
}
.loading-box{
  text-align: center;
  padding: 0.25rem 0;
}
.userinfo{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0.15rem;
  .img-box{
    width: 0.7rem;
    height: 0.7rem;
    margin-right: 0.2rem;
  } 
  .nickname{
    color: #333;
    font-size: 0.28rem;
    span{
      margin-right: 0.15rem;
    }
  }
}
.film-desc{
  padding: 0.2rem;
  padding-bottom: 60px; 
  position: relative;
  
  .title{
    font-size: 0.32rem; font-weight: bold;
    color: #333;
    margin-bottom: 0.1rem;
  }
  .fav-box{
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    display: flex;
    justify-content: flex-end;
    /* align-items: center; */
  }
  p{
    font-size: 0.28rem; color: #888;
    line-height: 1.6;
    margin-bottom: 0.1rem;
    &.indent{
      text-indent: 0.6rem;
    }
  }
}
</style>