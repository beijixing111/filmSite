
<template>
  <van-tabbar route  v-show="show" :active-color='activeColor' :style="{'z-index': (!isMobileAgent ? 1999 : 9999)}">
    <van-tabbar-item replace to="/" icon="home-o">电影</van-tabbar-item>
    <van-tabbar-item replace to="/mine" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
  <div v-show="!show" class="back-btn" @click="onBack" >
    <i class="fi fi-angle-left"></i>
  </div>
  
</template>

<script setup> 
// 
import { ref, watch, onMounted } from 'vue'; 
import { useRoute, useRouter } from 'vue-router'; 
import { isMobile } from '../../common/utils';

const route = useRoute();
const router = useRouter();

const activeColor = ref('#f46b84');

const showTabbarPaths = ['/', '/film', '/mine'];

const show = ref(true); 
const isMobileAgent = ref(isMobile());

const setShow = (path) => { 
  let hasPath = showTabbarPaths.find(item => path === item);
  show.value = !!hasPath; 
}

watch(route, (curPath) => { 
  setShow(curPath.path);
}); 

onMounted(() => {
  window.addEventListener('pageshow', () => setShow(route.path));
})

const onBack = () => {
  if(history.length < 2) {
    router.replace('/');
  } else {
    router.go(-1);
  }
}

</script>

<style lang="scss" scoped>
  .van-tabbar--fixed{
    z-index: 9999;
  }
  .back-btn{
    position: fixed;
    left: 0.25rem;
    bottom: 0.3rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0, 0.2);
    i{
      font-size: 0.4rem;
      color: #fff;
    }
  }
</style>