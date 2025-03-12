<template>
  <div class="copy-tool" v-debunce="handleClick">
    <el-icon class="copy"><CopyDocument /></el-icon>
  </div>
</template>

<script setup>
import {CopyDocument} from "@element-plus/icons-vue"
import { defineEmits } from "vue";
const emits = defineEmits(['handleCopy']);
const handleClick = () => {
  emits("handleCopy");
  console.log("111");
  
}
</script>

<style scoped>
.copy-tool{
  position: absolute;
  right: 15px;
  top: 0px;
}
.copy{
  width: 30px;
  height: 30px;
  border-radius: 15px;
  line-height: 15px;
  transition: all 0.2s ease-in;
  color: white;
}
.copy:hover{
  cursor: pointer;
  box-shadow: 0 0 4px #D8D9DA;
}
</style>
