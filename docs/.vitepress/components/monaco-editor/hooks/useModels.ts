import { computed, Ref, shallowReactive, ShallowRef, watchEffect } from "vue";
import { ModelOptions } from "../types";
import { editor } from "monaco-editor";
import { Monaco } from "@monaco-editor/loader";

/**
 * 创建 models
 */
export const useModels = (
  monacoRef: ShallowRef<Monaco | null>,
  modelOptions: Ref<ModelOptions[]>
) => {
  // 记录创建的 models，只会增加不会删除，方便后续找回
  const models = shallowReactive<Record<string, editor.ITextModel>>({});

  // 监听 modelOptions 变化，更新 models
  watchEffect(() => {
    const monaco = monacoRef.value;
    if (!monaco) {
      return;
    }

    modelOptions.value.forEach((option) => {
      const model = models[option.path];
      // model 存在，更新内容
      if (model) {
        model.setValue(option.value);
      } else {
        // 创建并存储 model
        const model = monaco.editor.createModel(
          option.value,
          option.language || "typescript",
          monaco.Uri.parse(option.path)
        );
        models[option.path] = model;
      }
    });
  });

  // 获取可见的 models，按照 modelOptions 的顺序
  const visiableModels = computed(() => {
    return modelOptions.value
      .map((option) => models[option.path])
      .filter(Boolean);
  });

  // 获取 model 对应的 path
  const getModelPath = (model?: editor.ITextModel | null) => {
    return Object.keys(models).find((key) => models[key] === model);
  };

  // 清理所有 model
  const disposeAllModel = () => {
    Object.values(models).forEach((model) => model.dispose());
  };

  return {
    models,
    visiableModels,
    getModelPath,
    disposeAllModel,
  };
};
