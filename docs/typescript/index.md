# Screeps TypeScript 指南

本指南旨在帮助初学者在 Screeps 中更好地使用 TypeScript（以后简称 ts），提高开发效率和代码质量。所有内容均为个人经验总结，不当之处欢迎指正。

## 为什么在 Screeps 中使用 TypeScript？

只使用 js 行不行？

当然没有问题！前期可以使用 js 开发熟悉游戏。对于初学者来说如果一开始就上手 ts，可能会面临一些挑战，限于 ts 的各种写法和报错，而不是专注于游戏本身，从而丧失了对游戏的兴趣，导致退坑。

> 注意，即使你使用 js 来开发，但只要使用了 `@types/screeps` 或者 `@types/lodash` 这两个类型库，你都在间接享受 ts 带给你的便利。在 js 的生态中，ts 已经无孔不入了。

然而从长期来说，对于多模块的大型项目，使用 ts 的优势会逐渐显现出来：

1. **类型安全**：TypeScript 提供静态类型检查，可以在编译阶段发现许多常见的错误，减少 bug。
2. **更好的开发体验**：借助类型提示和智能补全，能显著提升编码效率，尤其在复杂的 Screeps 逻辑和 API 调用中。
3. **易于维护和协作**：类型定义让代码更易读、更易于团队协作和长期维护。
4. **社区支持**：Screeps 社区有丰富的 TypeScript 资源和类型声明，能快速上手。

## 使用 TypeScript 可能遇到的问题

使用 ts 的过程并不是一帆风顺，初学者可能会遇到以下问题：

1. **编译配置复杂**：需要配置 tsconfig.json、打包工具（如 webpack/rollup）以及 Screeps 相关插件，初学者可能会感到繁琐。
2. **类型操作不熟悉**：初学者可能对 TypeScript 的类型系统不够熟悉，导致在类型声明和类型推导上遇到困难。
3. **构建速度**：随着项目变大，TypeScript 的编译和打包速度可能变慢，需要优化构建流程。

## 是否准备好使用 TypeScript

在决定是否使用 TypeScript 之前，可以先考虑以下几个问题：

1. **开发经验**：你是否对 js 比较熟悉，是否愿意花时间学习 ts 的类型系统？
2. **项目规模**：你是否已经对游戏的代码编写感到力不从心，经常需要记住参数和字段的类型，还常常遇到因为语法错误导致的 bug？
3. **长期维护**：项目是否需要长期维护？TypeScript 的类型系统能帮助在后期更容易地理解和修改代码。

如果你没有完全准备好，不必使用 ts 来开发所有代码，ts 可以根据你的需求逐步引入，即 ts 和 js 混合开发。
另外，使用 `jsdoc` 也可以为 js 代码提供类型提示。

## 总结

TypeScript 能显著提升 Screeps 项目的开发体验和代码质量，但也带来一定的学习和配置成本。建议有一定 JavaScript 基础后再尝试 TypeScript，并参考社区的最佳实践。

## 参考资料

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [我的 Screeps 代码](https://gitee.com/zhang-chuang-xin/ayaka-bot)
- [HoHo 的 Screeps 代码](https://github.com/HoPGoldy/my-screeps-ai)

<CodeEditor :model-options="modelOptions" :editor-styles="{height: '200px'}"></CodeEditor>

<script setup>
import {ref} from 'vue'
import {CodeEditor} from '@components/monaco-editor'

const modelOptions = [
    {
        value: `const foo = 1;`,
        language: 'typescript',
        path: 'main.ts'
    },
    {
        value: `const bar: number = 2;`,
        language: 'typescript',
        path: 'test.ts'
    }
]
</script>
