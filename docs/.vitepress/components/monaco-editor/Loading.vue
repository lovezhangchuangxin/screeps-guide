<template>
  <div class="loading-wrapper">
    <slot>
      <div class="loading-text">代码编辑器加载中...</div>
    </slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.loading-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .loading-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    color: #999;
  }
}
</style>
