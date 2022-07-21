<template>
  <div class="not-found">
    <p>{{notFount}}</p>
    <p class="back-text">{{backText}}</p>
  </div>
</template>

<script setup> 

import { ref } from 'vue';
const notFount = ref('很抱歉，迷路了！');
const backText = ref('返回，请点击左下方返回按钮！');

</script>

<style lang="scss" scoped>
.not-found{
  font-size: 0.38rem;
  text-align: center;
  color: #888;
  padding: 1rem 0;
  p{
    margin-bottom: 0.3rem;
    font-size: 0.38rem;
  }
  .back-text{
    font-size: 0.32rem;
    color: #f00;
  }
}

</style>