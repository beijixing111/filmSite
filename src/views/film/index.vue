<template>
  <div class="film-page">
    <van-list
      @load="onLoad"
      v-model:loading="loading"
      v-model:error="error" 
      :finished="finished"
      finished-text="没有更多了"
      :error-text="errorText" 
    >
      <div v-if="dataList.length">
        <FilmItem 
          v-for="film in dataList" :film='film' :key="film.id" 
        />
      </div>
    </van-list>
  </div>
</template>

<script setup> 

import { ref } from 'vue';
import * as Api from './api';
import FilmItem from './components/FilmItem';
import { useStore } from 'vuex';

// {id: 2, filmName:'小米发布会视频', filmUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/812358b69886e576c66a01f1f00affe9.mp4'}
 
const store = useStore();

const dataList = ref([]);
const total = ref(0);
const loading = ref(false);
const finished = ref(false);
const error = ref(false);
const page = ref(1);
const pageSize = 5;
const errorText = ref('请求失败，点击重新加载');

const onLoad = async () => { 
  loading.value = true;  
  try {
    let params = {
      page: page.value,
      pageSize,
    }
    
    let res = await Api.getFilmList(params);
    console.log(res);
    const {errorCode, data} =  res;
    if(errorCode == 0){
      dataList.value = dataList.value.concat(data.filmList);
      total.value = data.total;
      // 缓存一下filmList 
      store.commit('cacheFilmList', dataList.value);
    }
    loading.value = false;
    page.value++; 
    if(data.filmList.length < pageSize){
      finished.value = true;
    }
  } catch(err) {
    console.log(err);
  }
}

</script>

<style lang="scss" scoped>
.film-page{
  padding-bottom: 1rem;
}
</style>