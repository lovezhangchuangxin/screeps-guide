<template>
  <div class="code-editor">
    <!-- 代码编辑器头部，展示标题和操作按钮 -->
    <div class="header">
      <div class="title">
        <span class="title-content" @click="clickTitle">{{ title }}</span>
        <span
          class="expand-icon"
          :style="{
            transform: expand ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }"
        >
          &gt;
        </span>
      </div>
      <button class="reset" @click="resetCode">重置</button>
    </div>

    <!-- 代码编辑器 tabs，可以切换文件 -->
    <div class="tabs">
      <span
        v-for="(model, index) in modelOptions"
        :key="index"
        class="tab"
        :class="{
          active: model.path === currentPath,
        }"
        @click="changeModel(model.path)"
      >
        {{ model.path }}
      </span>
    </div>

    <!-- 代码编辑器本体 -->
    <MonacoEditor
      ref="editorRef"
      v-show="expand"
      :model-options="modelOptions"
      class="editor"
      language="typescript"
      :style="editorStyles"
    />
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, ref, toRefs, watchEffect } from "vue";
import MonacoEditor from "./MonacoEditor.vue";
import { ModelOptions } from "./types";

interface CodeEditorProps {
  title?: string;
  modelOptions: ModelOptions[];
  defaultExpand?: boolean;
  editorStyles?: CSSProperties;
}

const props = defineProps<CodeEditorProps>();
const { title = "Screeps游戏代码", defaultExpand } = props;
const { modelOptions, editorStyles } = toRefs(props);

const editorRef = ref<InstanceType<typeof MonacoEditor> | null>(null);
const expand = ref(defaultExpand);
const currentPath = ref(modelOptions.value[0]?.path || "");

const clickTitle = () => {
  expand.value = !expand.value;
};

const resetCode = () => {
  if (!editorRef.value) return;

  const value = modelOptions.value.find(
    (op) => op.path === currentPath.value
  )?.value;
  editorRef.value.editor?.setValue(value || "");
};

const changeModel = (path: string) => {
  editorRef.value?.changeModel(path);
  currentPath.value = path;
  expand.value = true;
};
</script>

<style scoped lang="less">
.code-editor {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  background: #fafbfc;

  .header {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;

    .title {
      flex: 1;
      font-weight: 600;
      font-size: 16px;
      color: #222;
      cursor: pointer;
      display: flex;
      align-items: center;

      .title-content {
        margin-right: 6px;
      }

      .expand-icon {
        display: inline-block;
        font-size: 14px;
        color: #aaa;
        margin-left: 2px;
      }
    }

    .reset {
      border: none;
      background: none;
      color: #007bff;
      cursor: pointer;
      font-size: 14px;
      padding: 4px 10px;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: #eaf4ff;
        text-decoration: underline;
      }
    }
  }

  .tabs {
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    background: #f8f9fa;
    padding-left: 10px;

    .tab {
      padding: 8px 18px;
      margin-right: 2px;
      cursor: pointer;
      font-size: 14px;
      color: #555;
      background: transparent;
      border-radius: 6px 6px 0 0;
      transition: background 0.2s, color 0.2s;
      position: relative;

      &.active {
        background: #fff;
        color: #007bff;
        font-weight: 600;
        box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.03);
        z-index: 2;
      }

      &:hover {
        background: #f0f4fa;
        color: #007bff;
      }
    }
  }
}

// 暗色模式
// 暗色模式优化
.dark .code-editor {
  border-color: #444;
  background: #23272f;

  .header {
    background: #2c2f36;
    color: #fff;
    border-bottom: 1px solid #444;

    .title-content {
      color: #fff;
    }

    .expand-icon {
      color: #ccc;
    }

    .reset {
      color: #66b1ff;
      background: none;
      &:hover {
        background: #222a;
      }
    }
  }

  .tabs {
    display: flex;
    border-bottom: 1px solid #444;
    background: #23272f;
    padding-left: 10px;

    .tab {
      padding: 8px 18px;
      margin-right: 2px;
      cursor: pointer;
      font-size: 14px;
      color: #bbb;
      background: transparent;
      border-radius: 6px 6px 0 0;
      transition: background 0.2s, color 0.2s;
      position: relative;

      &.active {
        background: #2c2f36;
        color: #66b1ff;
        font-weight: 600;
        box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08);
        z-index: 2;
      }

      &:hover {
        background: #222a;
        color: #66b1ff;
      }
    }
  }
}
</style>
