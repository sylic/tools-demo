<template>
  <div class="file-uploader text-gray-500">
    <el-upload
      class="upload-demo"
      drag
      :auto-upload="false"
      accept=".jpg,.png,.jpeg"
      :multiple="false"
      :before-upload="beforeUpload"
      :on-success="handleUploadSuccess"
      :show-file-list="false"
      :on-change="handleFileChange"
      action="#"
    >
      <div class="drag-image"></div>
      <div class="el-upload__text text-gray-500">
        拖拽上传图片
      </div>
      <el-button type="primary" class="mt-3 w-32">选择图片</el-button><br>
      <el-button @click.stop="getCopyImageData" plain :icon="DocumentCopy" class="mt-3 w-32">从剪贴板中粘贴</el-button>
      <div class="el-upload__tip">
          支持的文件类型：.jpg、.jpeg、.png
      </div>
    </el-upload>
    <div class="pic-preview" >
      <el-image class="img-preview" :src="picPreviewSrc" alt="请先选择图片" :preview-src-list="[picPreviewSrc]" fit="cover" >
        <template #error>
          <div class="error-prompt">
            请先选择图片
          </div>
        </template>
      </el-image>
    </div>
    <slot name="customOpt" :btnDisable="!selectedFile"></slot>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, ref} from "vue"
import { DocumentCopy } from '@element-plus/icons-vue';
import type { UploadProps,UploadFile } from 'element-plus';
import { fileReader,revokeUrl} from "@/utils/index";

const selectedFile = ref <UploadFile|File>();
// 读取剪切板
const getCopyImageData = ()=>{
  console.log("getCopyImageData");
}
// 上传之前的回调
const beforeUpload:UploadProps['beforeUpload'] = (e) => {
  return true;
}

// 上传成功
const handleUploadSuccess: UploadProps['onSuccess'] = (e) => {
}


const picPreviewSrc=ref('')
// 上传改变
const handleFileChange:UploadProps['onChange'] = (e) => {
  if (!e) return;
  selectedFile.value = e;
  // console.log(selectedFile.value);
  fileReader(e).then((res: string) => {
    picPreviewSrc.value = res;
  })
}

onBeforeUnmount(() => {
  // 销毁图片临时链接
  revokeUrl(picPreviewSrc.value)
})

defineExpose({
  selectedFile
})
</script>

<style scoped>
.file-uploader{
  width: 100%;
  height: 60%;
}
.file-uploader:deep(.el-upload-dragger){
  border: none;
  height: 100%;
  padding: 0px;
}
.file-uploader:deep(.el-upload){
  border: none;
  height: 100%;
}
.upload-demo{
  height: 100%;
}
.drag-image {
  background: url("@/assets/drag_and_drop.png") no-repeat center center;
  background-size: contain;
  width: 150px;
  height: 80px;
  margin: auto;
}

.pic-preview{
  border: var(--image-preview-border);
  width: 150px;
  height: 120px;
  border-radius: var(--border-radius);
  background-color: var(--el-fill-color-lighter);
  margin: auto;
}
.img-preview{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .error-prompt{
    text-align: center;
    font-size: 14px;
  }
}
</style>
