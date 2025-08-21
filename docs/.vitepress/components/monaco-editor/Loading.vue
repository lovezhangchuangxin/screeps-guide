<template>
  <div class="loading-wrapper">
    <slot>
      <div class="loading-text">
        <p>代码编辑器加载中...</p>
        <p v-if="passedTime > 5000">
          如果长时间未加载成功，请检查网络连接，或者挂上🪜后刷新页面。
        </p>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const startTime = ref(Date.now());
const passedTime = ref(0);
const timerId = ref<NodeJS.Timeout | null>(null);

onMounted(() => {
  timerId.value = setInterval(() => {
    passedTime.value = Date.now() - startTime.value;
  }, 1000);
});

onUnmounted(() => {
  if (timerId.value) {
    clearInterval(timerId.value);
  }
});
</script>

<style scoped lang="less">
.loading-wrapper {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .loading-text {
    text-align: center;
    font-size: 16px;
    color: #999;

    p {
      line-height: 20px;
    }
  }
}

.dark .loading-text {
  color: #eee;
}
</style>
