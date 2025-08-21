import { type editor } from "monaco-editor";
import { CSSProperties } from "vue";

/**
 * 编辑器 model 配置
 */
export interface ModelOptions {
  /** model 的内容 */
  value: string;
  /** model 的语言 */
  language: string;
  /** model 的路径 */
  path: string;
}

/**
 * 编辑器组件 props
 */
export interface MonacoEditorProps {
  /** 编辑器所有的 model 配置 */
  modelOptions: ModelOptions[];
  /** 主题 */
  theme?: "light" | "vs-dark";
  /** 字体 */
  fontFamily?: string;
  /** 字体大小 */
  fontSize?: number;
  /** 是否自动布局 */
  automaticLayout?: boolean;
  /** 编辑器样式 */
  style?: CSSProperties;
  /** 编辑器内容变化时的回调 */
  onValueChange?: (
    newValue: string,
    event: editor.IModelContentChangedEvent
  ) => void;
}

/**
 * 代码编辑器组件 props
 */
export interface CodeEditorProps {
  /** 代码编辑器标题 */
  title?: string;
  /** 多文件配置 */
  modelOptions: ModelOptions[];
  /** 是否默认关闭 */
  defaultClose?: boolean;
  /** 编辑器样式 */
  editorStyles?: CSSProperties;
}
