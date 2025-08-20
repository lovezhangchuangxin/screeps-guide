<template>
  <div class="editor-wrapper" :style="{ height: '200px' }">
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
import { EditorProps } from "./types";
import Loading from "./Loading.vue";

const props = defineProps<EditorProps>();
const {
  value,
  language,
  theme,
  fontFamily,
  fontSize,
  automaticLayout,
  onValueChange,
} = toRefs(props);

const containerRef = ref<HTMLDivElement | null>(null);
const monacoRef = shallowRef<Monaco | null>(null);
const editorRef = shallowRef<editor.IStandaloneCodeEditor | null>(null);
const isEditorReady = ref(false);
const { isDark } = useData();

onMounted(async () => {
  if (!containerRef.value) {
    return;
  }

  const cancelable = loader.init();
  cancelable
    .then((monaco) => {
      monacoRef.value = monaco;

      // 导入 Screeps 的类型声明文件
      import("./screeps.txt?raw").then(({ default: dts }) =>
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          dts,
          "screeps.d.ts"
        )
      );

      // 创建 model
      const model = monaco.editor.createModel(value.value, language.value);

      // 创建编辑器
      editorRef.value = monaco.editor.create(containerRef.value!, {
        model,
        theme: theme.value,
        fontFamily: fontFamily.value || "monospace",
        fontSize: fontSize.value || 16,
        automaticLayout: automaticLayout.value || true,
      });

      // 监听内容变化
      editorRef.value.onDidChangeModelContent((event) => {
        const newValue = editorRef.value?.getValue();
        if (newValue !== value.value) {
          onValueChange.value?.(newValue || "", event);
        }
      });

      isEditorReady.value = true;
    })
    .catch((error) => {
      console.error("Error loading Monaco Editor:", error);
    });
});

onUnmounted(() => {
  editorRef.value?.dispose();
});

watchEffect(() => {
  if (!editorRef.value) return;

  editorRef.value.updateOptions({
    theme: theme.value ?? (isDark.value ? "vs-dark" : "light"),
    fontFamily: fontFamily.value || "monospace",
    fontSize: fontSize.value || 16,
    automaticLayout: automaticLayout.value || true,
  });
});

defineExpose({
  monaco: monacoRef,
  editor: editorRef,
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
