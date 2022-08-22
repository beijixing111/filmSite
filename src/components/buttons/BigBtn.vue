<template>
  <button 
    :type="type"
    :disabled='disabled'
    :style="{...styles}"
    class="big-btn" 
    :class="[
      loading ? 'not-allow' : '',
      disabled ? 'not-allow disabled' : ''
    ]"
    @click="onClick"> 
    <slot><Loading v-if="loading"  />登&nbsp;&nbsp;录</slot>
  </button>
</template>

<script setup>
// ['big-btn', highlight? ' highlight' : '']
import { Loading } from 'vant';
import { reactive } from 'vue';
const emit = defineEmits(['click'])
const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  style: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  background: String,
});
const styles = reactive({ 
  ...props.style,
  background: props.background,
});
 

const onClick = (e) => {
  if(props.loading || props.disabled) return;
  emit('click', e);
}
</script>

<style lang='scss' scoped>
.big-btn{
  display: flex;
  width: 100%;
  height: 0.8rem;  
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;  
  color: #fff; 
  font-size: 0.3rem; 
  background: linear-gradient(90deg,#fab3b3,#ffbcb3 73%,#ffcaba);
  /* background-image: linear-gradient(90deg,#fab3b3,#ffbcb3 73%,#ffcaba); */

  /* box-shadow: 0 0.1rem 0.2rem 0 rgba(255,62,62,.2); */
  margin: 0 auto; border: none; 
  outline: none; cursor: pointer;
  margin-bottom: 0.15rem;
  &.not-allow{
    cursor: not-allowed;
    touch-action: none;
    opacity: 0.85;
    &.disabled{
      opacity: 0.5;
    }
  }
  .van-loading{
    color: #fff;
    margin-right: 0.15rem;
    font-size: 0.24rem;
  }
}


</style>