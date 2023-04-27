<template>
  <div style="display: none;">
    <p>{{ testMsg }}</p>
  </div>
</template>

<script setup >
import { ref, onMounted } from 'vue'; 

const testMsg = ref("我是测试的文本");

onMounted(() => {
  console.log("child async mounted");
})

</script>