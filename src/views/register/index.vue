<template>
  <div class="login-content">
    <h3>注&nbsp;&nbsp;&nbsp;&nbsp;册</h3>
    <form style="margin-bottom: 50px;">
      <div class="login-item">
        <input type="text" placeholder="用户名" 
          v-model='userName' autoComplete="off"  
        />
        <div class="line"></div>
        <i class="clear" :style="{display: userName.length > 0 ? 'flex' : 'none'}"
          @click='onClear'
        >×</i>
      </div>
      <!-- <p style="font-size: 14px; color: #999">{{userName}}</p> -->
      <div class="login-item ">
        <input type="password" placeholder="请输入密码" 
          v-model='password' autoComplete="off" 
          @focus='onPwdFocus'
          @blur='onPwdBlur'
        />
        <div class="line"></div>
        <i class="clear rig" 
          :style="{display: password.length > 0 ? 'flex' : 'none'}"
          @click='onClearPassword'
        >×</i>
      </div>
      <!-- <div class="login-item">
        <input type="password" class="password" placeholder="请输入确认密码" 
          v-model='surePwd' autoComplete="off" 
          @focus='onPwdFocus'
          @blur='onPwdBlur'
        />
        <div class="line"></div>
        <i class="clear rig" 
          :style="{display: password.length > 0 ? 'flex' : 'none'}"
          @click='onClearPassword'
        >×</i>
      </div> -->
    </form>

    <div style="padding: 0.3rem;">
      <BigBtn :disabled='!highlight' 
        background="#f86698" @click="onRegister" 
        style="margin-bottom: 0.4rem" 
      >提&nbsp;&nbsp;&nbsp;&nbsp;交</BigBtn>
    </div>

  </div>
</template>

<script setup> 

import { ref, watch } from 'vue'; 
// import { useRouter, useRoute } from 'vue-router';

// import { useStore } from 'vuex';
import { Toast } from 'vant'
import { BigBtn } from '../../components/buttons';
import * as Api from './api'; 

const userName = ref('');
const password = ref(''); 
// const surePwd = ref(''); 
const highlight = ref(false);

// const router = useRouter();
// const route = useRoute();
// const store = useStore();

const onPwdBlur = () => {
  // IOS键盘收起后，页面滚动对应位置
  window.scroll(0, 0);
}

const onClear = () => {
  userName.value = ''; 
}

const onPwdFocus = () => {
  let body = document.querySelector('body');
  body.scrollTop = 0;
}

const onClearPassword = () => {
  password.value = '';
}

watch(userName, (cur) => {
  console.log(cur);
  highlight.value = cur.length > 0 && password.value.length > 0;
});

watch(password, (cur) => {
  console.log(cur);
  highlight.value = cur.length > 0 && password.value.length > 0;
});

const onRegister = async () => {
  if (!password.value || password.value.length < 6) {
    return Toast('密码不能为空且长度不能小于6位！');
  }

  try {
    const tLoading = Toast.loading({ 
      forbidClick: true,
      loadingType: 'spinner',
    });
    let res = await Api.login({
      userName: userName.value,
      password: password.value,
      gender: 1
    }); 
    tLoading.clear();
    if(res.errorCode == 0) {
      console.log(res); 
      Toast('恭喜你，注册成功！');
      // store.commit('login', res.data);
      // const query = route.query;
      // let path = query.redirectPath ? query.redirectPath : '/mine';
      // router.replace(path);
    }
  } catch (err) {
    console.log(err);
  }
}


</script>

<style lang="scss" scoped>

$inputH: 50px;

input{
	-webkit-appearance:none;
}

.login-content{
	padding-top: 0.6rem;
  h3{
    font-size: 0.36rem; font-weight: bold;  
    color: #333; text-align: center;
    margin-bottom: 0.6rem;
  }

	.login-item{
		width: 88%; height: 1rem;
    line-height: 1.2;
		overflow: hidden; margin: 20px auto; 
		display: flex; align-items: center;
		flex-direction: row;
		position: relative; 
		&.mar{
			margin-bottom: 50px; 
		}
		input{ 
			padding-right: 0.3rem; box-sizing: border-box;
			font-size: 0.34rem; color: #333;  
			width: 100%; height: 100%; 
			outline: none; box-shadow: none;
			border: none; 
			&::-webkit-placeholder{
				font-size: 14px; color: #888;
			}
			&:-webkit-autofill{
				box-shadow: 0 0 0px 1000px white inset; 
			}
      &:focus + .line{
        /* border: ; */
        background: linear-gradient(90deg,#fab3b3,#ffbcb3 73%, #f86698);
        box-shadow: 0 0 0.05rem #f86698;
      }
		}
    .line{ 
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.01rem;
      background: #e2e2e2;
    }
		.clear{
			position: absolute; right: 0; 
			display: flex; width: 0.5rem; height: 0.5rem;
			justify-content: center; cursor: pointer;
      align-items: flex-end;  
			font-size: 20px; color: #ccc;
		}
		.forget-pw{
			position: absolute; right: 0;  
			display: flex; justify-content: flex-end; 
			align-items: center; font-size: 0.30rem;
			color: #222; padding-left: 0.3rem; 
			border-left: 0.01rem solid #ccc; 
			height: 26px; line-height: 26px;
		}
	} 
}

</style>