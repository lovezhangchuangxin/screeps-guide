import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Layout from "./components/Layout.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {},
  // 使用注入插槽的包装组件覆盖 Layout
  Layout: Layout,
} satisfies Theme;
