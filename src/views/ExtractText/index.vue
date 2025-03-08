<template>
  <div class="extract-box flex-row rounded-lg">
    <div class="flex-item file-uploader-box">
      <file-upload />
    </div>
    <div class="flex-item recognize-box"></div>
  </div>
</template>

<script setup lang="ts">
import { } from "vue";
import FileUploader from "@/components/FileUpload/index.vue"
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
