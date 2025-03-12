<template>
  <div class="extract-box flex-row rounded-lg">
    <div class="flex-item file-uploader-box">
      <file-upload ref="fileUplader">
        <template v-slot:customOpt="{btnDisable}">
          <el-button :disabled="btnDisable"  type="primary" class="mt-8 w-32" @click="recognizeText">识别文字</el-button>
        </template>
      </file-upload>
    </div>
    <div class="flex-item recognize-box">
      <div class="tool-box rounded-tl-lg rounded-tr-lg">
        <copy-tool @handleCopy="copyText"/>
      </div>
      <div class="content">
        {{ recognizeRes}}
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref,onMounted} from "vue";
import FileUploader from "@/components/FileUpload/index.vue";
import CopyTool from "@/components/CopyTool/index.vue"
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
  recognizeRes.value = txt;
}

// 复制
const copyText = () => {
  let text = recognizeRes.value;
  if (navigator.clipboard) {
        // clipboard api 复制
        navigator.clipboard.writeText(text);
  }
  else {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    // 赋值
    textarea.value = text;
    // 选中
    textarea.select();
    // 复制
    document.execCommand('copy', true);
    // 移除输入框
    document.body.removeChild(textarea);
}
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
  border-left: 1px solid #EEEDEB;
  border-top: none;
  position: relative;
}
.content::-webkit-scrollbar {
    display: none;
  }
.content{
  padding:0 10px 10px;
  height: calc(100% - 40px);
  overflow-y: scroll;
}
.tool-box{
  height: 40px;
  width: 100%;
  background-color: #98D8EF;
  line-height: 40px;
}
</style>
