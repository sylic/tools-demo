export default {
  mounted (el, binding) {
    // bind的类型必须是function
    if (typeof binding.value !== "function") return;
    const delayTime = Number(binding.arg) || 800; // 点击的时间控制
    el.timer = null;
    el.flag = true;
    el.handler = function (...args) {
      // 立即执行一次
      el.flag && binding.value.apply(this, args);
      el.flag = false;
      if (el.timer) {
        clearTimeout(el.timer);
        el.timer = null;
      }
      el.timer = setTimeout(() => {
        el.flag = true;
        el.timer = null;
      }, delayTime);
    };
    el.addEventListener('click', el.handler);
  },
  beforeUnmount (el) {
    if (el.timer) {
      clearTimeout(el.timer);
      el.timer = null;
    }
    el.removeEventListener('click', el.handler);
  }
};