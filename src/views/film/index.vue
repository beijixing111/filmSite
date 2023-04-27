<template>
  <div class="film-page">
    <Banner />
    <van-list
      @load="onLoad"
      v-model:loading="loading"
      v-model:error="error" 
      :finished="finished"
      :finished-text="finishedText"
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
import Banner from './components/Banner';
import { useStore } from 'vuex';
import { onActivated } from 'vue'; 

// {id: 2, filmName:'小米发布会视频', filmUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/812358b69886e576c66a01f1f00affe9.mp4'}
 
const store = useStore();

const dataList = ref([]);
const total = ref(0);
const loading = ref(false);
const finished = ref(false);
const finishedText = ref('没有更多了');
const error = ref(false);
const page = ref(1);
const pageSize = 5;
const errorText = ref('请求失败，点击重新加载');
const isLoad = ref(false);

onActivated(() => {
  // console.log('onActivated', isLoad.value);
  if(isLoad.value) return;
  if(total.value === 0){ 
    finished.value = false;
    onLoad();
  }
})

const onLoad = async () => {  
  if(isLoad.value) return;
  isLoad.value = true;

  loading.value = true;  
  try {
    let params = {
      page: page.value,
      pageSize,
    }
    
    let res = await Api.getFilmList(params);
    // console.log(res);
    isLoad.value = false;
    const {errorCode, data} = res;
    if(errorCode == 0){
      dataList.value = dataList.value.concat(data.filmList);
      total.value = data.total;
      finished.value = true;
      // 缓存一下filmList 
      store.commit('cacheFilmList', dataList.value);
    }
    loading.value = false;
    if(page.value === 1 &&  data.total === 0){
      finished.value = true;
      finishedText.value = '暂无数据！';
    }else {
      page.value++; 
    }
    if(data.filmList.length < pageSize){
      finished.value = true;
    }
  } catch(err) {
    // console.log('112');
    console.log(err);
    loading.value = false;
    error.value = true;
  }
}

</script>

<style lang="scss" scoped>
.film-page{
  padding-bottom: 1rem;
}
</style>