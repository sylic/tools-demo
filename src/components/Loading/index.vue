<template>
  <div v-if="showLoading" class="loading-text"></div>
</template>

<script setup>
import {defineExpose,ref} from "vue";
const showLoading = ref(false);

const changeStatus = (status) => {
  showLoading.value = status;
}

defineExpose({
  changeStatus
})
</script>

<style scoped>
.loading-text{
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border-top: 3px solid #DDDDDD;
  border-right: 3px solid transparent;
  animation: loading 0.8s linear infinite;
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
