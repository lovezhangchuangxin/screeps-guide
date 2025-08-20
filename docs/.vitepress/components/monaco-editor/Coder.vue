<template>
  <div class="code-editor">
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
    <Editor
      ref="editorRef"
      v-show="expand"
      class="editor"
      :value="code"
      language="typescript"
      :style="editorStyles"
    />
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, ref, toRefs } from "vue";
import Editor from "./Editor.vue";

interface CoderProps {
  title?: string;
  code: string;
  defaultExpand?: boolean;
  editorStyles?: CSSProperties;
}

const props = defineProps<CoderProps>();
const { title = "Screeps游戏代码", code, defaultExpand } = props;
const { editorStyles } = toRefs(props);

const editorRef = ref<InstanceType<typeof Editor> | null>(null);
const expand = ref(defaultExpand);

const clickTitle = () => {
  expand.value = !expand.value;
};

const resetCode = () => {
  if (!editorRef.value) return;

  editorRef.value.editor?.setValue("");
};
</script>

<style scoped lang="less">
.code-editor {
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;

  .header {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: #f5f5f5;

    .title {
      flex: 1;
      font-weight: bold;
      cursor: pointer;

      .title-content {
        margin-right: 4px;
      }

      .expand-icon {
        display: inline-block;
        font-size: 12px;
        color: #aaa;
      }
    }

    .reset {
      border: none;
      background: none;
      color: #007bff;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

// 暗色模式
.dark .code-editor {
  border-color: #444;
  background: #333;

  .header {
    background: #444;
    color: #fff;

    .title-content {
      color: #fff;
    }

    .expand-icon {
      color: #ccc;
    }

    .reset {
      color: #66b1ff;
    }
  }
}
</style>
