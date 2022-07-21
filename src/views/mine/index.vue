<template>
  <div class="mine-page">
    <div class="user-info" >
      <div class="avatar" >
        <van-image class="avatar-img" v-if="isLogin" fit="cover" round 
          :src="userInfo.picture"
        />
      </div>
      <div class="info" v-if="isLogin">
        <div class="nickName">{{userInfo.nickName}}</div>
        <div class="status">
          <i class="fi fi-music-note"></i>
        </div>
      </div>
      <div v-if="!isLogin" class="">
        <span>未登录，请先去<span @click="goLogin" class="login-btn">登录</span></span>
      </div> 
    </div> 

    <div class="items-box" v-if="isLogin" > 
      <div class="item-group">
        <div class="item" @click="goFavorite">  
          <div class="label-box" >
            <i class="fi fi-star"></i>
            <span>收藏</span>
          </div>
          <div class="rig">
            <span v-show="starCount > 0">{{starCount}}</span>
            <i class="fi fi-angle-right"></i>
          </div>
        </div> 
      </div>
 
      <div class="item-group">
        <div class="item" @click="goLogout">  
          <div class="label-box" >
            <i class="fi fi-player-settings"></i>
            <span>设置</span>
          </div>
          <div class="rig"> 
            <i class="fi fi-angle-right"></i>
          </div>
        </div>  
      </div> 
 
    </div>

    <div v-if="!isLogin" class="empty">
      <div class="box">此处功能，需要登录后才能查看！</div>
    </div>

    <div class="ptip" v-if="!isLogin">
      <h3>关于本项目</h3>
      <p>本项目为Vue3 全家桶体验项目</p>  
      <p>后端node.js，部分接口还在开发中</p>
      <p>如有bug，纯属正常</p>
      <p>项目地址：</p>
      <p><a :href="gitAdr" target="_blank">{{gitAdr}}</a></p>
    </div>
    <!-- <van-button type="primary" @click="onTest">登录</van-button> -->
  </div>
</template>

<script setup> 
import { ref } from 'vue';
import { Toast, Dialog } from 'vant'; 
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const userInfo = ref(store.state.userInfo); 
 
const isLogin = ref(store.getters.getUserIsLogin);
 
const starCount = ref(store.getters.getFavoriteTotal);
// const msg = ref('这是父组件的数据');

const goFavorite = () => { 
  router.push('/favorite');
} 

const goLogin = () => {
  router.push('/login');
}

const gitAdr = 'https://github.com/beijixing111/filmSite';

const goLogout = () => {
  Dialog.confirm({
    title: '提示',
    message: `暂无设置页面，仅退出功能，确定要退出吗？`,
  }).then(() => {
    store.commit('logout'); 
    isLogin.value = false;
    userInfo.value = {};
    Toast('退出成功！');
  })
}

</script>

<style lang="scss" scoped>
$distance: 0.25rem;
$color: #f46b84;

.mine-page{
  background: #fafafa;
  height: 100vh; 
  overflow: auto;
  .user-info{
    margin-bottom: $distance;
    display: flex;
    align-items: center;
    justify-items: flex-start;
    padding: $distance;
    background: #fff;
    margin-bottom: $distance;
    .avatar{
      width: 1.6rem; height: 1.6rem;
      border: 0.01rem solid #ccc;
      margin-right: $distance;
      border-radius: 50%;
      background: #fafafa;
      overflow: hidden; 
      .avatar-img{
        height: 100%;
        width: 100%;
      }
    }
    .info{
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      .nickName{
        font-size: 0.34rem;
        font-weight: bolder;
        color: #666;
        margin-bottom: 0.2rem;
      }
      .status{  
        /* width: 0.6rem;
        height: 0.6rem; 
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #d7d7d7;  */
        i{
          font-size: 0.38rem;
          color: $color; 
        }
      }
    }
    
  } 
  .items-box{ 
    .item-group{
      margin-bottom: $distance;
      background: #fff; 
      border-radius: 0.2rem;
      .item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
        margin-left: 0.9rem; 
        font-size: 0.3rem;
        color: #888;
        border-bottom: 0.01rem solid #dfdfdf;
        &:last-child{
          border: 0;
        }
        .label-box{
          position: relative;
          i{
            position: absolute;
            left: -0.65rem;
            top: 0;
            font-size: 0.4rem;
            color: $color;
          }
        }
        .rig{
          margin-right: $distance;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 100%;
          span{
            font-size: 0.4rem;
            color: #888;
          }
          i{
            font-size: 0.4rem;
            color: #dedede;
            margin-left: 0.1rem;
          }
        }
      }
    }
    
  }
}
.login-btn{
  display: inline-block;
  padding: 0.1rem 0.25rem;
  font-size: 0.3rem;
  color: #fff;
  background: $color;
  border-radius: 0.1rem;
  margin-left: 0.15rem;
}
.empty{
  background: #fff; 
  margin-bottom: 0.25rem;
  .box{
    display: flex;
    justify-content: center;
    align-items: center; 
    height: 4rem;
    padding: 0.4rem 0; 
    font-size: 0.36rem;
    color: #888;
  }
}
.ptip{
  background: #fff;
  padding: 0.25rem;
  text-align: center;
  font-size: 0.3rem;
  color: #666; 
  h3{  
    font-size: 0.34rem;
    color: #333;
    margin-bottom: 0.2rem;
  }
  p{ 
    font-size: 0.3rem; 
    padding: 0.15rem 0; 
    a{
      color: #677edd;
    }
  } 
}
</style>