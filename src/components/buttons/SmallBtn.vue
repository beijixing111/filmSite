
<template> 
  <span class="custom-btn" @click="onClick" :style='stys'>
    <slot name="icon"></slot>
    <slot>登录</slot> 
  </span>
</template>

<script setup> 
import { reactive } from 'vue';
const emit = defineEmits(['click'])
const props = defineProps({
  inline: {
    type: Boolean,
    default: true
  },
  style: {
    type: Object,
    default: () => ({})
  }
});
const stys = reactive({
  display: (props.inline ? 'inline-' : '') + 'block',
  fontSize: '0.3rem',
  backgroundColor: '#f46b84',
  borderRadius: '0.1rem',
  color: '#fff',
  ...props.style
});

const onClick = (e) => {
  // console.log(e);
  emit('click', e);
}

</script>

<style lang="scss" scoped>
 
.custom-btn{ 
  padding: 0.1rem 0.25rem; 
  margin-left: 0.15rem;
}
   
</style>