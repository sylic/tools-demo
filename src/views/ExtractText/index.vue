<template>
  <div class="extract-box flex-row rounded-lg">
    <div class="flex-item file-uploader-box">
      <file-upload ref="fileUplader">
        <template v-slot:customOpt="{btnDisable}">
          <el-button :disabled="btnDisable"  type="primary" class="mt-8 w-32" @click="recognizeText">识别文字</el-button>
        </template>
      </file-upload>
    </div>
    <div class="flex-item recognize-box rounded-lg">
      <div class="content">
        {{ recognizeRes}}
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,onMounted} from "vue";
import FileUploader from "@/components/FileUpload/index.vue";
import { createWorker } from "tesseract.js";

const fileUplader = ref();
const isRecognizing = ref(false);// 识别状态
const recognizeRes = ref("");// 识别的结果
// 识别文字
const recognizeText = () => {
  if (!fileUplader.value.selectedFile) return;
  (async () => {
    isRecognizing.value = true;
  let ORCWorker = await createWorker(['eng', 'chi_sim'], 1, {
    logger: m => {
      if (m.status == 'recognizing text' && m.progress == 1) {
        isRecognizing.value = false;
      }
    }
  });
  const ret = await ORCWorker.recognize(fileUplader.value.selectedFile.raw);
  await ORCWorker.terminate();
  typeRes(ret.data.text)
})();
}
// 打字机输出文字
const typeRes = (txt) => {
  
 }
</script>

<style scoped>
.extract-box{
  width: 80%;
  height: 60vh;
  
  display: flex;
  border: 1px solid #EEEDEB;
  margin:50px auto;
}
.flex-item{
  height: 100%;
  flex-basis: 50%;
}
.file-uploader-box{
  padding:32px 0;
}
.recognize-box{
  overflow-y: scroll;
  border-left: 1px solid #EEEDEB;
  background-color: var(--el-fill-color-lighter);
}
.recognize-box::-webkit-scrollbar {
    display: none;
  }
</style>
