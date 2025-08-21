# 如何贡献文档

如果您想为本项目贡献新的文档，您可能需要先了解本项目的原理。

本文档基于 `vitepress`，并封装了一个代码编辑器组件 `CodeEditor`
效果如下，您可能在很多地方已经见过，

<CodeEditor :model-options="modelOptions" :editor-styles="{height: '200px'}"></CodeEditor>

<script setup>
import {CodeEditor} from '@components/monaco-editor'

const modelOptions = [
    {
        value: `const t: Test = {age: 12}\nconst a = Game.time`,
        language: 'typescript',
        path: 'main.ts'
    },
    {
        value: `interface Test {
    age: number        
}`,
        language: 'typescript',
        path: 'test.ts'
    }
]
</script>

它的使用代码如下：

```vue
<CodeEditor :model-options="modelOptions" :editor-styles="{ height: '200px' }">
</CodeEditor>

<script setup>
import { CodeEditor } from "@components/monaco-editor";

const modelOptions = [
  {
    value: `const t: Test = {age: 12}\nconst a = Game.time`,
    language: "typescript",
    path: "main.ts",
  },
  {
    value: `interface Test {
    age: number        
}`,
    language: "typescript",
    path: "test.ts",
  },
];
</script>
```

`CodeEditor`组件提供了极为有限的功能，主要是注入了 Screeps 的类型声明文件，并用于多文件代码的展示。

未来它将支持的功能：

- 优化样式
- 支持跳转到定义
- 支持将更改保存到 localStorage
- 支持更多的主题
- 实现类似 Error Lens 插件的效果
- 支持 Diff 编辑器
- 支持导出图片
