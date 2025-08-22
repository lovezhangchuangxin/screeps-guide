<template>
  <div class="editor-wrapper" :style="style">
    <!-- 加载中 -->
    <Loading v-if="!isEditorReady">
      <template #loading>
        <slot name="loading"></slot>
      </template>
    </Loading>

    <!-- 渲染编辑器 -->
    <div
      v-show="isEditorReady"
      ref="containerRef"
      class="editor-container"
      style="width: 100%"
    ></div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  toRefs,
  onUnmounted,
  watchEffect,
  shallowRef,
} from "vue";
import loader, { Monaco } from "@monaco-editor/loader";
import { useData } from "vitepress";
import { editor } from "monaco-editor";
import { MonacoEditorProps } from "./types";
import Loading from "./Loading.vue";
import { useChangeModel } from "./hooks/useChangeModel";
import { useModels } from "./hooks/useModels";

const props = defineProps<MonacoEditorProps>();
const {
  modelOptions,
  theme,
  fontFamily,
  fontSize,
  automaticLayout,
  onValueChange,
  style,
} = toRefs(props);

const containerRef = ref<HTMLDivElement | null>(null);
const monacoRef = shallowRef<Monaco | null>(null);
const editorRef = shallowRef<editor.IStandaloneCodeEditor | null>(null);
const isEditorReady = ref(false);

const { isDark } = useData();
const { models, visiableModels, getModelPath, disposeAllModel } = useModels(
  monacoRef,
  modelOptions
);
const { viewStates, changeModel } = useChangeModel();

// 获取 monaco
onMounted(async () => {
  const cancelable = loader.init();
  cancelable
    .then((monaco) => {
      monacoRef.value = monaco;

      // 导入 Screeps 的类型声明文件
      import("./screeps.d.txt?raw").then(({ default: dts }) =>
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          dts,
          "screeps.d.ts"
        )
      );
    })
    .catch((error) => {
      console.error("Error loading Monaco Editor:", error);
    });
});

// 销毁 editor 和 models
onUnmounted(() => {
  editorRef.value?.dispose();
  disposeAllModel();
});

// 创建 editor
watchEffect(() => {
  if (isEditorReady.value) return;

  if (!monacoRef.value || !visiableModels.value.length || !containerRef.value) {
    return;
  }

  const firstModel = visiableModels.value[0];
  // 下面的编辑器配置必须在创建的时候设置好，而不是等到后面再更新
  editorRef.value = monacoRef.value.editor.create(containerRef.value, {
    model: firstModel,
    theme: theme.value ?? (isDark.value ? "vs-dark" : "light"),
    fontFamily: fontFamily.value || "monospace",
    fontSize: fontSize.value || 16,
    automaticLayout: automaticLayout.value || true,
  });
  editorRef.value.onDidChangeModelContent((event) => {
    if (onValueChange.value) {
      onValueChange.value(editorRef.value?.getValue() || "", event);
    }
  });

  isEditorReady.value = true;
});

// 监听配置变化
watchEffect(() => {
  if (!editorRef.value) return;

  editorRef.value.updateOptions({
    theme: theme.value ?? (isDark.value ? "vs-dark" : "light"),
    fontFamily: fontFamily.value || "monospace",
    fontSize: fontSize.value || 16,
    automaticLayout: automaticLayout.value || true,
  });
});

// 根据路径选择 model
const selectModel = (path: string) => {
  if (!editorRef.value) return;

  const model = models[path];
  if (model) {
    changeModel(editorRef.value, model, viewStates);
  }
};

defineExpose({
  monaco: monacoRef,
  editor: editorRef,
  changeModel: selectModel,
  getModelPath,
});
</script>

<style scoped lang="less">
.editor-wrapper {
  position: relative;
  height: 100%;
}

.editor-container {
  height: 100%;
}
</style>
