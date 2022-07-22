<template>
  <div class="login-content">
    <h3>登&nbsp;&nbsp;&nbsp;&nbsp;录</h3>
    <form>
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
      <div class="login-item mar">
        <input type="password" class="password" placeholder="请输入密码" 
          v-model='password' autoComplete="off" 
          @focus='onPwdFocus'
          @blur='onPwdBlur'
        />
        <div class="line"></div>
        <i class="clear rig" 
          :style="{display: password.length > 0 ? 'flex' : 'none'}"
          @click='onClearPassword'
        >×</i>
        <a class="forget-pw">忘记密码</a>
      </div>
    </form>

    <div style="padding: 0.3rem;">
      <BigBtn :disabled='!highlight' 
        background="#f86698" @click="onLogin" 
        style="margin-bottom: 0.4rem" 
      />
      <BigBtn background="#686363" @click="onFill">一键填充账号密码</BigBtn>
    </div>

  </div>
</template>

<script setup> 

import { ref, watch } from 'vue'; 
import { useRouter, useRoute } from 'vue-router';

import { useStore } from 'vuex';
import { Toast } from 'vant'
import { BigBtn } from '../../components/buttons';
import * as Api from './api'; 

const userName = ref('');
const password = ref(''); 
const highlight = ref(false);

const router = useRouter();
const route = useRoute();
const store = useStore();

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

const onFill = () => {
  userName.value = 'test';
  password.value = '123456';
}

const onLogin = async () => {
  if (!password.value || password.value.length < 6) {
    return Toast('密码不能为空且长度不能小于6位！');
  }

  try {
    let res = await Api.login({
      userName: userName.value,
      password: password.value
    });
    const tLoading = Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
    }); 
    tLoading.clear();
    if(res.errorCode == 0) {
      console.log(res); 
      store.commit('login', res.data);
      const query = route.query;
      let path = query.redirectPath ? query.redirectPath : '/mine';
      router.replace(path);
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
      &.password{
        width: 80%;
        margin-right: 20%;
      }
			&::-webkit-placeholder{
				font-size: 14px; color: #666;
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
			&.rig{
				right: 1.75rem;
			}
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