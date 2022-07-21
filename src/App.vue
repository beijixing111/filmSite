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
    <div :style='{height: `${height}px`}'>
      <!-- wechat  -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import { useRoute } from 'vue-router';
import MyTabs from './components/tabs/index';
import { isWechat } from './common/utils';

const height = ref(0);


if(isWechat()){
  height.value = 30;
}

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
