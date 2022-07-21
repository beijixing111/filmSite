<template>
  <div class="fixed-top"> 
    <p>收藏总数：{{total}}</p>
    <span class="all-btn" type="primary" v-show="total > 0" @click="onAllClear">全删</span>
  </div>
  <div class="favorite-page"> 
    <van-list
      @load="onLoad"
      v-model:loading="loading"
      v-model:error="error" 
      :finished="finished"
      :finished-text="finishedText"
    > 
      <div class="favorite-list">
        <div class="favorite-item" v-for="film in dataList" :key="film.id" @click="goDetail(film.id)">
          <span>{{film.filmName}}</span>
          <span><i class="fi fi-angle-right"></i></span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script setup> 

import { ref } from 'vue';
// import * as Api from './api';  
import { Dialog } from 'vant';
import { useStore } from 'vuex'; 
import { useRouter } from 'vue-router';  

const store = useStore();
const router = useRouter();

const dataList = ref([]);
const total = ref(0);
const loading = ref(false);
const finished = ref(false); 
const finishedText = ref('没有更多了');
// const page = ref(1);
// const pageSize = 5; 

const onLoad = async () => { 
  loading.value = true;   
  dataList.value = store.state.favoriteList;
  total.value = store.getters.getFavoriteTotal;
  if(total.value === 0){
    finishedText.value = '暂无收藏哦！';
  } 
  loading.value = false; 
  finished.value = true;
}

const goDetail = (id) => {
  router.push({
    path: `/filmdetail/${id}`,
    query: {
      id: id
    }
  }); 
}

const onAllClear = () => {
  Dialog.confirm({
    title: '提示',
    message: `确定要清除所有收藏吗？`,
  })
  .then(() => {
    store.dispatch('clearFavorite');
    dataList.value = []; 
    total.value = 0;
  })
  .catch(() => {
    console.lgo('取消！');
  }); 
}

</script>

<style lang="scss" scoped>
.fixed-top{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 2;
  background: #efefef;
  p{
    height: 1rem;
    padding: 0.25rem;
    font-size: 0.32rem; 
  }
  .all-btn{
    position: absolute;
    right: 0.25rem;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    padding: 0.1rem 0.25rem;
    font-size: 0.28rem;
    color: #fff;
    background: #f46b84;
    border-radius: 0.1rem;
  }
}
.favorite-page{
  padding-top: 1rem;
  padding-bottom: 1rem; 
  .favorite-list{
    padding: 0 0.25rem;
    background: #fafafa;
    .favorite-item{
      height: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.01rem dashed #d2d2d2;
      /* background: #d2d2d2; */
      &:last-child{
        border: 0;
      }
      span{
        font-size: 0.34rem;
        color: #333; 
      }
      i{
        font-size: 0.3rem;
        color: #ccc;
      }

    }
  }
}
</style>