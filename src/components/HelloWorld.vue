<template>
  <div>
    <p>WebSocket Status: {{ status }}</p>
    <button @click="close">关闭连接</button>
  </div>
</template>

<script lang='ts'>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { io } from "socket.io-client";
export default {
  setup() {
    const status = ref("Disconnected");
    let socket = null;
    let heartbeatInterval = null;
    const heartbeatIntervalTime = 30000; // 10 seconds

    const connectWebSocket = () => {
      socket = io("http://localhost:3000");

      socket.on("connect", () => {
        status.value = "Connected";
        startHeartbeat();
      });

      socket.on("disconnect", () => {
        console.log("连接关闭");
        status.value = "Disconnected";
        stopHeartbeat();
        setTimeout(() => {
          connectWebSocket();
        }, 5000);
      });

      socket.on("pong", () => {
        console.log("Received pong from server");
      });
    };

    const startHeartbeat = () => {
      heartbeatInterval = setInterval(() => {
        if (socket && socket.connected) {
          socket.emit("ping");
        }
      }, heartbeatIntervalTime);
    };

    const stopHeartbeat = () => {
      clearInterval(heartbeatInterval);
    };

    const close = () => {
      socket.disconnect();
    };

    const testTs = () => {
      type BaseType = string | number | boolean;
      function copy<T extends BaseType>(arg: T): T {
        return arg;
      }
      console.log(copy("hello"));
    };

    onMounted(() => {
      connectWebSocket();
      testTs();
    });

    onBeforeUnmount(() => {
      stopHeartbeat();
      if (socket) {
        socket.disconnect();
      }
    });

    return {
      status,
      close,
    };
  },
};
</script>
