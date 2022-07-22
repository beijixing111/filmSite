<template> 
  <div>
    <router-view  v-slot="{ Component, route }"> 
      <keep-alive >
        <component v-if="route.meta.keepAlive" :is="Component" :key="route.meta.keepAlive ? route.path : undefined" />
      </keep-alive>
      <component v-if="!route.meta.keepAlive" :is="Component" />
      <!-- <component  :is="Component" :key="route.path" /> -->
    </router-view>
    <MyTabs /> 

    
    <van-dialog overlay v-model:show="show" title="手机访问体验更佳" v-if="!isMobileAgent" @confirm="onConfirm">
      <div style="text-align: center; padding: 10px; ">
        <img :src="codeImage" width="130" />
      </div>
    </van-dialog> 
    
    <div :style='{height: `${height}px`}'>
      <!-- wechat  -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';  
import { Dialog } from 'vant';
import MyTabs from './components/tabs/index';
import { isWechat } from './common/utils';
import { isMobile } from './common/utils';
const VanDialog = Dialog.Component;
import codeImage from './assets/images/erweima.png';

const height = ref(0);
if(isWechat()){
  height.value = 30;
}


const isMobileAgent = ref(isMobile()); 
const show = ref(!isMobile());

const onConfirm = () => show.value = false;

</script>

<style lang="scss">
body{
  max-width: 800px;
  margin: 0 auto;
}
.van-tabbar--fixed{
  max-width: 800px;
}
</style>
