# 定义 Memory 类型

## Memory 介绍

在 Screeps 游戏中，Memory 是一种持久化存储机制，允许我们在游戏 tick 之间保存和读取数据。在 JavaScript 中可以随意操作 Memory，但在 TypeScript 项目中，为了获得类型检查和智能提示，我们需要提前定义好 Memory 的结构类型，这样才能安全、规范地读写各个字段。

那么，Memory 包含哪些类型？

<CodeEditor title="Screeps中的Memory类型" :model-options="memoryTypesOptions" :editor-styles="{height: '180px'}"></CodeEditor>

在上面的代码示例中，将鼠标悬停在 `memory` 变量上，可以看到以下几种 Memory 类型：

- `Memory`
- `CreepMemory`
- `RoomMemory`
- `SpawnMemory`
- `FlagMemory`

接下来，我们将学习如何自定义这些 Memory 类型的结构，也就是如何扩展和修改它们的类型定义。

在此之前，先了解一个重要概念：类型合并。

## 类型合并

TypeScript 支持同名接口的自动合并（Declaration Merging）。当多个文件中声明了同名的全局接口时，TypeScript 会将它们的属性合并到一起。

例如，`main.ts` 中定义了 `Person` 接口只包含 `name` 字段，而 `person.ts` 中又定义了同名接口并添加了 `age` 字段。最终，`Person` 类型会同时拥有 `name` 和 `age` 两个属性。

结论：**TypeScript 会自动合并同名的全局接口声明。**

<CodeEditor title="同名全局接口的声明合并" :model-options="typeMergeOptions" :editor-styles="{height: '150px'}"></CodeEditor>

## 全局接口

同名接口的合并只会发生在“全局接口”之间。那么，什么是全局接口？

在 JavaScript/TypeScript 中，每个文件默认拥有自己的作用域。如果文件中包含 `import` 或 `export` 语句，则该文件会被视为模块，里面的类型不会自动暴露到全局，也不会与其他文件的类型合并。

只有没有导入导出语句的文件，其接口类型才会被视为全局接口，可以自动合并。

例如，下面的例子中，由于 `main.ts` 文件加上了 `export`，它变成了模块作用域，与 `person.ts` 的全局作用域隔离，因此接口类型不会自动合并。

<CodeEditor title="模块作用域与全局作用域" :model-options="moduleTypeOptions" :editor-styles="{height: '200px'}"></CodeEditor>

## 在模块中声明全局接口

前面提到，只有没有导入导出语句的文件，其接口才会被视为全局接口。Screeps 的类型声明文件通常没有这些语句，所以我们可以直接扩展全局类型。

在一些开源 Screeps 机器人项目中，常见做法是将所有类型声明都放在一个没有导入导出的文件里，这样其他地方可以直接使用这些类型。但这种方式在大型项目中会导致类型文件臃肿、难以维护。

有没有办法在模块（即有导入或导出语句的文件）中声明全局接口？

答案是：可以，使用 [`declare global`](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#global-augmentation) 语法。

**`declare global` 可以让你在模块中声明全局类型。**（注意：只有有导入或导出语句的文件才是模块）

如下例所示，虽然 `main.ts` 是一个模块，但在 `declare global` 语句块中声明的 `Person` 类型依然会作为全局类型，与 `person.ts` 中的全局类型合并。

<CodeEditor title="模块中声明全局接口" :model-options="moduleDeclareGlobalOptions" :editor-styles="{height: '220px'}"></CodeEditor>

## Memory 类型定义实践

通过以上例子，我们可以得出结论：**在模块中使用 `declare global` 扩展 Memory 类型，是 TypeScript 项目中定义 Screeps Memory 的最佳实践。**

<CodeEditor title="Screeps中定义Memory" :model-options="screepsMemoryOptions" :editor-styles="{height: '250px'}"></CodeEditor>

<script setup>
import {CodeEditor} from '@components/monaco-editor'

const codeMemoryTypes = `const memory = Memory; // Memory
const creepMemory = Game.creeps[""].memory; // CreepMemory
const roomMemory = Game.rooms[""].memory; // RoomMemory
const spawnMemory = Game.spawns[""].memory; // SpawnMemory
const flagMemory = Game.flags[""].memory; // FlagMemory
`
const memoryTypesOptions = [
    {
        value: codeMemoryTypes,
        language: 'typescript',
        path: 'main.ts',
    },
]

const typeMergeOptions = [
    {
        value: `interface Person {
    name: string;
}
const p: Person = {
    name: "John"
};
`,
        language: 'typescript',
        path: 'main.ts',
    },
    {
        value: `
interface Person {
    age: number;
}
`,
        language: 'typescript',
        path: 'person.ts',
    }
]

const moduleTypeOptions = [
   {...typeMergeOptions[0], value: typeMergeOptions[0].value + '\nexport {}'},
   {...typeMergeOptions[1]}
] 

const moduleDeclareGlobalOptions = [
    {
        value: `declare global {
    interface Person {
        name: string;
    }
}
const p: Person = {
    name: "John"
};
export {}
`,
        language: 'typescript',
        path: 'main.ts',
    },
    {...typeMergeOptions[1]}
]

const screepsMemoryOptions = [
    {
        value: `declare global {
    interface Memory {
        myData: string;
    }
}


// 注意：只有有导入或导出语句的文件才是模块
// declare global 语法只能在模块中使用
export {}
`,
        language: 'typescript',
        path: 'types.ts',
    },
    {
        value: `Memory.myData = "Hello World";
`,
        language: 'typescript',
        path: 'test.ts',
    }
]

</script>
