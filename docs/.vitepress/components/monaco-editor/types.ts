import { type editor } from "monaco-editor";
import { CSSProperties } from "vue";

/**
 * 编辑器组件 props
 */
export interface EditorProps {
  /** 编辑器当前的 model 的值 */
  value: string;
  /** 当前 model 的语言 */
  language: string;
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
