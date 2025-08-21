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
      { text: "ts指南", link: "/typescript/index" },
    ],

    sidebar: [
      { text: "Screeps TypeScript 指南", link: "/typescript/index" },
      { text: "前言", link: "/typescript/introduce" },
      { text: "定义 Memory 类型", link: "/typescript/define-memory" },
      { text: "扩展原型对象", link: "/typescript/extend-prototype" },
      { text: "类型断言和收束", link: "/typescript/type-assertion" },
      { text: "如何贡献文档", link: "/typescript/how-to-contribute" },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/lovezhangchuangxin/screeps-guide",
      },
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
        "@codes": resolve(__dirname, "./codes"),
      },
    },
  },
});
