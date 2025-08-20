import { defineConfig } from "vitepress";
import { resolve } from "path";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/screeps-guide/",
  title: "Screeps 指南",
  description: "A guide to Screeps",
  head: [["link", { rel: "icon", href: "aqing.ico" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "ts指南", link: "/typescript" },
    ],

    sidebar: [
      {
        text: "ts指南",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    footer: {
      message: "Released under the MIT License",
      copyright: "Copyright © 2023 lovezhangchuangxin",
    },

    search: {
      provider: "local",
    },

    lastUpdated: {
      text: "最近更新于",
    },
  },
  vite: {
    resolve: {
      alias: {
        "@components": resolve(__dirname, "./components"),
      },
    },
  },
});
