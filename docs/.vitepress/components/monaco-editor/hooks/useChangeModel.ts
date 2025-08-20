import { editor } from "monaco-editor";

export const useChangeModel = () => {
  /** 视图状态 */
  const viewStates = new Map<string, editor.ICodeEditorViewState>();

  /** editor 切换 model */
  const changeModel = (
    editor: editor.IStandaloneCodeEditor,
    model: editor.ITextModel,
    viewStates: Map<string, editor.ICodeEditorViewState>
  ) => {
    // 获取当前编辑器的 view state 并保存
    const lastModel = editor.getModel();
    const lastViewState = editor.saveViewState();
    if (lastModel && lastViewState) {
      viewStates.set(lastModel.uri.toString(), lastViewState);
    }

    // 切换 model
    editor.setModel(model);

    // 恢复之前的 view state
    if (viewStates.has(model.uri.toString())) {
      editor.restoreViewState(viewStates.get(model.uri.toString())!);
    } else {
      editor.setPosition({ lineNumber: 1, column: 1 });
    }
  };

  return {
    viewStates,
    changeModel,
  };
};
