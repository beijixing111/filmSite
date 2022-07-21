<template>
  <div class="film-box"> 
    <div class="film-container"> 
      <div class="poster-box" @click="goDetail">
        <div class="title" >{{film.filmName}}</div>
        <van-image class="poster" lazy-load fit="cover" :src="posterUrl" />
      </div> 
    </div>
    <div class="film-footer">
      <div class="le">
        <van-image class="img-box"
          round lazy-load :src="posterUrl" fit="cover"
        />
        <div class="film-desc">
          <span>电影类型：<FilmType :type='film.filmType' /></span>
        </div>
        
      </div>
      <div class="rig">
        <Favorite :favId='film.id' :favFilmName='film.filmName' :favNum='film.filmHeat' />
      </div>
    </div>
  </div>
</template>

<script> 

import { defineComponent, ref } from 'vue'; 
import { useRouter } from 'vue-router';  
import Favorite from './Favorite'; 
import FilmType from './FilmType';
// import { useStore } from 'vuex';
export default defineComponent({
  name: 'film-card', 
  components: {
    Favorite,
    FilmType
  }, 
  props: {
    film: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {  
    // console.log(props.film);
    const router = useRouter();  
    const posterUrl = ref('https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg');
  
    const goDetail = () => {
      // console.log('/film/', props.film.id);
      const {id } = props.film;
      router.push({
        path: `/filmdetail/${id}`,
        query: {
          id: id
        }
      }); 
    }

    return {  
      posterUrl,
      goDetail,
    };
  }
})
</script>

<style lang="scss" scoped>
.video-box{
  width: 100%;
  height: 4rem;
}
.film-box{
  background: #fafafa;
  max-width: 8.6rem;
  min-height: 4rem;
  width: 100%; 
  .film-container{
    position: relative;  
    height: 4.26rem; 
    width: 100%; 
  }
  .title{
    position: absolute;
    top: 0; left: 0;
    z-index: 9999;
    width: 100%; 
    padding: 0.15rem 0.2rem;
    font-size: 0.34rem;
    color: #f4f4f4;
    font-weight: bolder;
  }
  .poster-box{
    width: 100%;
    height: 4.26rem; 
    position: relative;
    overflow: hidden;
    /* box-shadow: inset 0 0.16rem 0.2rem #ccc,
                inset 0 -0.16rem 0.2rem #ccc,
                inset -0.16rem 0 0.2rem #ccc,
                inset 0.16rem 0 0.2rem #ccc; */
  } 
  .film-footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1rem;
    padding: 0.15rem 0.2rem;
    .le{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .img-box{
        width: 0.7rem;
        height: 0.7rem;
        margin-right: 0.2rem;
      } 
      .film-desc{
        color: #888;
        font-size: 0.32rem;
        span{
          margin-right: 0.15rem;
        }
      }
    }
    .rig{
      display: flex;
      justify-content: flex-end;
      align-items: center; 
    }
  }

}
</style>