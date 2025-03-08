<template>
  <div class="extract-box flex-row rounded-lg">
    <div class="flex-item file-uploader-box">
      <file-upload ref="fileUplader">
        <template v-slot:customOpt="{btnDisable}">
          <el-button :disabled="btnDisable"  type="primary" class="mt-8 w-32" @click="recognizeText">识别文字</el-button>
        </template>
      </file-upload>
    </div>
    <div class="flex-item recognize-box"></div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import FileUploader from "@/components/FileUpload/index.vue";
import { createWorker } from "tesseract.js";

const fileUplader = ref();
// 识别文字
const recognizeText = () => {
  if (!fileUplader.value.selectedFile) return;
}
</script>

<style scoped>
.extract-box{
  width: 80%;
  height: 60vh;
  padding:32px 0;
  display: flex;
  border: 1px solid #EEEDEB;
  margin:50px auto;
}
.flex-item{
  height: 100%;
  flex-basis: 50%;
}
.file-uploader-box{

}
.recognize-box{
  overflow-y: scroll;
  border-left: 1px solid #EEEDEB;
}
.recognize-box::-webkit-scrollbar {
    display: none;
  }
</style>
