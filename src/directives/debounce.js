export default {
  mounted (el, binding) {
    // bind的类型必须是function
    if (typeof binding.value !== "function") return;
    const delayTime = Number(binding.arg) || 800; // 点击的时间控制
    el.timer = null;
    el.handler = function (...args) {
      if (el.timer) {
        clearTimeout(el.timer);
        el.timer = null;
      }
      el.timer = setTimeout(() => {
        // 改变this指向并执行
        binding.value.apply(this, args);
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