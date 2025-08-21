# 类型断言和收束

本篇文档参考了 Mofeng 大佬的文章 [Filter 与 type predicate](https://github.com/DiamondMofeng/Learn-Typescript-in-Screeps/blob/zh-cn/%E6%AD%A3%E6%96%87/4.-lei-xing-shou-shu/filter-yu-type-predicate.md)

## 常见建筑类型

在正式开始之间，我们先了解一些 Screeps 中常见的建筑对象类型：

<CodeEditor title="Screeps 中常见的建筑类型" :model-options="commonStructureOptions" :editor-styles="{height: '200px'}"></CodeEditor>

我们可以看到：

- `AnyStructure` 表示所有建筑类型的联合类型
- `AnyOwnedStructure` 表示所有有 owner 属性的建筑类型的联合类型
- `AnyStoreStructure` 表示所有有 store 属性的建筑类型的联合类型
- 其他具体的建筑类型是建筑名称前面加上 Structure，如 `StructureContainer`、`StructurePortal`、`StructureRoad`、`StructureWall` 等

## 获取某种类型的建筑

在 Screeps 中我们可以通过 room 对象上的 find 方法来查找建筑，但是如果不作处理，返回的建筑的类型为 AnyStructure。

<CodeEditor title="room.find 返回值" :model-options="roomFindOptions" :editor-styles="{height: '250px'}"></CodeEditor>

通常我们的解决方案是使用**类型断言**，明确指出返回值的类型。如：

<CodeEditor title="room.find 返回值" :model-options="roomFindAssertOptions" :editor-styles="{height: '250px'}"></CodeEditor>

<script setup>
import {CodeEditor} from '@components/monaco-editor'

const commonStructureOptions = [
    {
        value: `// 所有建筑：type AnyStructure = AnyOwnedStructure | StructureContainer | StructurePortal | StructureRoad | StructureWall
type A = AnyStructure
type B = AnyOwnedStructure // 所有有 owner 属性的建筑
type C = AnyStoreStructure // 所有有 store 属性的建筑
type IsLabBelongToC = StructureLab extends C ? true: false // true
export {}
        `,
        language: 'typescript',
        path: 'main.ts'
    },
]

const roomFindOptions = [
    {
        value: `const room = Game.rooms['']

// AnyStructure，虽然我们知道返回的建筑类型肯定是 StructureContainer，
// 但目前TypeScript 无法推断出这一点
const containers = room.find(FIND_STRUCTURES, {
    filter: (structure) => {
        return structure instanceof StructureContainer
    }
});
export {}
        `,
        language: 'typescript',
        path: 'main.ts'
    }
]

const roomFindAssertOptions = [
    {
        value: `const room = Game.rooms['']
const containers = room.find(FIND_STRUCTURES, {
    filter: (structure) => {
        return structure instanceof StructureContainer
    }
}) as StructureContainer[];
export {}
        `,
        language: 'typescript',
        path: 'main.ts'
    }
]
</script>
