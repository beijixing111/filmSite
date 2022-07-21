<template>
  <span>{{filmTypeText}}</span>
</template>

<script setup >

import { ref } from 'vue'; 
const props = defineProps({
  type: Number
});
const filmTypes = {
  '1': '恐怖',
  '2': '爱情',
  '3': '动作',
  '4': '喜剧',
  '6': '社交',
  '7': '其他'
};

const filmTypeText = ref(filmTypes[props.type]);

  
</script>