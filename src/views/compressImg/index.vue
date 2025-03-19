<template>
  <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="#"
    multiple
    :auto-upload="false"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="1"
    :on-exceed="handleExceed"
    :on-change="handleUploadChange"
  >
    <el-button type="primary">上传文件</el-button>
  </el-upload>
  <Transition>
    <img :src="compressedImgSrc" alt="Compressed Image" v-if="compressedImgSrc" class="photo" />
 </Transition>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {compressImage}  from "./hooks"
import type { UploadProps, UploadUserFile} from 'element-plus'

const fileList = ref<UploadUserFile[]>([

])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}
// 压缩后的图片路径
let compressedImgSrc=ref('')
const handleUploadChange:UploadProps['onChange']  = async (file:any)=>{
  if(!file) return;
  let originSize = file.size / 1000;
  console.log(`压缩前图片大小：${originSize}kb`);
  const isPhoto = file.raw.type.includes("image");
  console.log(isPhoto);
  
  if(file.size && originSize>500 && isPhoto){
    let compressedImg:any = await compressImage(file.raw);
    const compressedSize = compressedImg.size / 1000; 
    compressedImgSrc.value = URL.createObjectURL(compressedImg);
    console.log(`压缩后图片大小：${compressedSize}kb`);
  }
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}
</script>

<style scope>
.photo{
  height: 250px;
  width: 250px;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>