<template>
  <div class="landing" v-if="landingData">  
    <div class="title">
      {{landingData.title}}
    </div> 
    <div class="desc">
      <div v-for="img in landingData.imgages" :key="img.id" class="img-box">
        <img style="width: 100%" class="img-sty" :mode="'aspectFill'" 
        :src="img.url"/>
      </div>
      <div class="p">{{landingData.desc}}</div>
    </div>
    <div class="video">
      <!-- <video> -->
    </div>
    <div class="end"></div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';  
const landingData = ref(null);
const loading = ref(false);
const route = useRoute();

const getLandingData = async () => {
  const {id} = route.params; 
  console.log(id);
  loading.value = true;
  try{ 
    // 
    let picUrl = 'https://s3.bmp.ovh/imgs/2023/02/08/714a1efeb76cd58c.png';
    landingData.value = {
      title: '阿凡达2',
      desc: '阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2。',
      imgages: [
        {
          id: 1,
          url: picUrl
        }
      ],
      videoUrl: ''
    }
    loading.value = false;
  }catch(err) {
    console.log(err);
  }
};
getLandingData();

</script>

<style lang="scss" scoped> 
  .landing { 
    padding: 0.2rem 0.15rem;
    .title{
      font-size: 0.34rem;
      font-weight: bold;
      padding: 0.15rem 0;
      text-align: center; 
    }
    .desc{
      padding: 0.3rem 0;
      .img-box{
        margin-bottom: 0.15rem;
      }
      .img-sty{
        border-radius: 0.20rem;
        height: 4.2rem;
        width: 100%;
      }
      .p{
        text-indent: 0.6rem;
        line-height: 1.5;
        font-size: 0.3rem;
        color: #666;
      }
     
    }
	}
</style>