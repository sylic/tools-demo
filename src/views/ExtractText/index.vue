<template>
  <div class="extract-box flex-row rounded-lg">
    <div class="flex-item file-uploader-box">
      <file-upload ref="fileUplader">
        <template v-slot:customOpt="{btnDisable}">
          <el-button :disabled="btnDisable"  type="primary" class="mt-8 w-32" @click="recognizeText" circle size="large" :icon="Right"></el-button>
        </template>
      </file-upload>
    </div>
    <div class="flex-item recognize-box">
      <div class="tool-box rounded-tl-lg rounded-tr-lg">
        <div class="tool-icon flex-row" @click="reset"><el-icon><RefreshRight /></el-icon></div>
        <copy-tool @handleCopy="copyText"/>
      </div>
      <div class="content">
        <loading ref="loadingRef"></loading>
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
import Loading from "@/components/Loading/index.vue"
import {
  Right,RefreshRight
} from '@element-plus/icons-vue'
const fileUplader = ref();
const recognizeRes = ref("");// 识别的结果

const loadingRef = ref(null);
// 识别文字
const recognizeText = () => {
  if (!fileUplader.value.selectedFile) return;
  recognizeRes.value = '';
  (async () => {
    loadingRef.value.changeStatus(true);
  let ORCWorker = await createWorker(['eng', 'chi_sim'], 1, {
    logger: m => {
      if (m.status == 'recognizing text' && m.progress == 1) {
         loadingRef.value.changeStatus(false);
      }
    }
  });
  const ret = await ORCWorker.recognize(fileUplader.value.selectedFile);
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

// 重置
const reset = () => {
  recognizeRes.value = '';
  fileUplader.value.clearUpload();
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
  padding:5px 5px 10px;
  height: calc(100% - 40px);
  overflow-y: scroll;
  text-align: left;
}
.tool-box{
  height: 40px;
  width: 100%;
  background-color: var(--el-color-primary-light-5);
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
