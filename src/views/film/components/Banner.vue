<template>
  <div class="banner"> 
    <div class="banner-container">
      <van-swipe class="swipe" :autoplay="swipeObj.autoplay" lazy-render :indicator-color="swipeObj.indicatorColor">
        <van-swipe-item class="swiper-item" v-for="image in swipeObj.banners" :key="image.id">
          <img @click="toLanding(image.id)" style="width: 100%" :src="image.bannerUrl" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup>
import { getBannerList } from '../api';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const swipeObj = reactive({
  autoplay: 3000,
  indicatorColor: '#fff',
  banners: []
}); 

const toLanding = (id) => {
  console.log(id);
  router.push({
    path: `/landing/${id}`,
  });
}

const getBanners = async () => {
  try {
    let {errorCode, data} = await getBannerList();
    if(errorCode === 0) {
      swipeObj.banners = data.list;
      // console.log(data); 
    }
  } catch(err) {
    console.log(err);
  }
}
getBanners();

</script>

<style lang="scss" scoped>
  $bannerHei: 4.2rem;
  .banner{
    height: $bannerHei;
  }
  .banner-container{
		width: 6.90rem;
		width: 100%;
	}
	.swiper {
		height: $bannerHei;
	}
	.swiper-item {
		display: block;
		height: 100%;
		line-height: 100%;
		text-align: center;
	}
</style>