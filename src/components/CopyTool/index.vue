<template>
  <div class="container">
    <button class="copy-btn" v-debunce="handleClick">
      <transition name="icon-transition">
        <!-- 打钩图标 (成功状态) -->
        <svg
          v-if="isCopied"
          key="success"
          class="icon"
          viewBox="0 0 1024 1024"
        >
          <path
            d="M866.133333 258.133333l-481.28 481.28L157.866667 563.2l59.733333-59.733333 146.346667 146.346666 421.546666-421.546666 59.733334 59.733333z"
          />
        </svg>
      </transition>
      <transition name="icon-transition">
        <!-- 复制图标 (默认状态) -->
        <svg
          v-if="!isCopied"
          key="copy"
          class="icon"
          viewBox="0 0 1024 1024"
        >
          <path
            d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM382 896h-0.2L232 746.2v-0.2h150v150z"
          />
        </svg>
      </transition>
    </button>
  </div>
</template>

<script setup>
import {defineEmits,ref} from "vue"
const isCopied = ref(false);
const showMessage = ref(false);
const timer = ref(null);

const emits= defineEmits(['handleCopy'])
const handleClick = () => {
      try {
        // 复制文本到剪贴板（示例文本）
        emits('handleCopy');
        // 更新状态显示反馈
        isCopied.value= true
        showMessage.value = true
        
        // 清除旧定时器
        if (timer.value) clearTimeout(timer.value)
        
        // 设置3秒后重置状态
        timer.value = setTimeout(() => {
          isCopied.value = false
          showMessage.value = false
        }, 1000)
        
      } catch (err) {
        alert('复制失败，请手动复制')
      }
    }
</script>

<style scoped>
.container {
  position: absolute;
  right: 15px;
  top: 0px;
  width: 40px;
  height: 40px;
  line-height: 40px;
}

.copy-btn {
  border: none;
  height: 100%;
  width: 100%;
  line-height: 40px;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
}

.copy-btn:hover {
  background: #66b1ff;
}

.icon {
  top: 50%;
  margin: auto;
  width: 20px;
  height: 20px;
  fill: white;
}

/* 图标过渡动画 */
.icon-transition-enter-active,
.icon-transition-leave-active {
  transition: all 0.2s;
}
.icon-transition-enter {
  opacity: 0;
}
.icon-transition-leave-to {
  opacity: 0;
}
</style>
