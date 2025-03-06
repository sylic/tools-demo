<template>
  <div class="file-uploader text-gray-500">
    <el-upload
      class="upload-demo"
      drag
      :auto-uploa="false"
      accept="jpg|jpeg|png"
      action="#"
      :multiple="false"
    >
      <div class="drag-image"></div>
      <div class="el-upload__text text-gray-500">
        拖拽上传图片
      </div>
      <el-button type="primary" class="mt-3 w-32">选择图片</el-button><br>
      <el-button @click.stop="getCopyImageData" plain :icon="DocumentCopy" class="mt-3 w-32">从剪贴板中粘贴</el-button>
      <div class="el-upload__tip">
          支持的文件类型：.jpg、.jpeg、.png。
      </div>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { DocumentCopy } from '@element-plus/icons-vue';

// 读取剪切板
const getCopyImageData = ()=>{
  console.log("getCopyImageData");
}
</script>

<style scoped>

.file-uploader{
  width: 100%;
  height: 50%;
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
</style>
