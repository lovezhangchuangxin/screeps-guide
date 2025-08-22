# 类型断言与类型收束

本文参考了 Mofeng 大佬的文章：[Filter 与 type predicate](https://github.com/DiamondMofeng/Learn-Typescript-in-Screeps/blob/zh-cn/%E6%AD%A3%E6%96%87/4.-lei-xing-shou-shu/filter-yu-type-predicate.md)

## Screeps 常见建筑类型

在正式讲解之前，先了解 Screeps 中常见的建筑相关类型：

<CodeEditor title="Screeps 中常见的建筑相关类型" :model-options="commonStructureOptions" :editor-styles="{height: '300px'}"></CodeEditor>

可以看到：

- `AnyStructure`：所有建筑类型的联合类型
- `AnyOwnedStructure`：所有拥有 owner 属性的建筑类型联合
- `AnyStoreStructure`：所有拥有 store 属性的建筑类型联合
- `StructureConstant`：所有建筑类型字符串的联合类型
- `BuildableStructureConstant`：所有可建造建筑类型字符串的联合类型
- 具体建筑类型以 Structure 前缀命名，如 `StructureContainer`、`StructurePortal`、`StructureRoad`、`StructureWall` 等

## 获取指定类型的建筑

在 Screeps 中，可以通过 room 对象的 find 方法查找建筑。但如果不加处理，返回的建筑类型为 AnyStructure。

<CodeEditor title="room.find 返回值" :model-options="roomFindOptions" :editor-styles="{height: '250px'}"></CodeEditor>

### 类型断言指定类型

常见做法是使用**类型断言**，手动指定返回值类型。例如：

<CodeEditor title="断言类型" :model-options="roomFindAssertOptions" :editor-styles="{height: '250px'}"></CodeEditor>

**注意：使用类型断言时，请确保你对断言处的类型有充分了解，避免类型错误。**

### 类型收束与类型推断

除了类型断言，还可以通过**类型收束**实现更优雅的类型推断。

类型收束常用方法之一是使用 `is` 关键字定义类型保护函数。

在 TypeScript 中，如果一个函数返回 `boolean`，可以用 `is` 关键字标注返回值为 `true` 时的类型。

如下例，`utils4.ts` 中定义了类型保护函数 `isContainer`，用于判断建筑是否为容器类型。在 `main4.ts` 中，通过该函数过滤建筑。

<CodeEditor title="类型收束自动推断类型" :model-options="typeNarrowingOptions" :editor-styles="{height: '250px'}"></CodeEditor>

显然，不可能为每种建筑类型都单独定义判断函数，这样既繁琐又难维护。幸运的是，Screeps 类型声明文件中提供了 `ConcreteStructure` 这种映射类型，可以通过建筑类型常量直接映射到具体类型。

例如：

```ts
// StructureContainer
type Container = ConcreteStructure<STRUCTURE_CONTAINER>;
```

我们可以改造之前的判断函数，实现更通用的建筑类型判断：

<CodeEditor title="通用的建筑类型判断函数" :model-options="generalJudgeOptions" :editor-styles="{height: '300px'}"></CodeEditor>

<script setup>
import {CodeEditor} from '@components/monaco-editor'

const commonStructureOptions = [
    {
        value: `// 所有建筑：type AnyStructure = AnyOwnedStructure | StructureContainer | StructurePortal | StructureRoad | StructureWall
type A = AnyStructure
type B = AnyOwnedStructure // 所有有 owner 属性的建筑
type C = AnyStoreStructure // 所有有 store 属性的建筑
// 判断 lab 是否属于 AnyStoreStructure 类型
type IsLabBelongToC = Expect<IsExtend<StructureLab, C>>

// type StructureConstant = BuildableStructureConstant | "keeperLair" | "controller" | "powerBank" | "portal" | "invaderCore"
type D = StructureConstant
// type BuildableStructureConstant = "extension" | "rampart" | "road" | "spawn" | "link" | "constructedWall" | "storage" | "tower" | "observer" | "powerSpawn" | "extractor" | "lab" | "terminal" | "container" | "nuker" | "factory"
type E = BuildableStructureConstant

export {}
        `,
        language: 'typescript',
        path: 'main1.ts'
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
        path: 'main2.ts'
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
        path: 'main3.ts'
    }
]

const typeNarrowingOptions = [
    {
        value: `
import { isContainer } from './utils4'
const room = Game.rooms['']
const containers = room.find(FIND_STRUCTURES, {
    filter: isContainer
})
type R = Expect<Equal<typeof containers, StructureContainer[]>>
export {}
        `,
        language: 'typescript',
        path: 'main4.ts'
    },
    {
        value: `export function isContainer(structure: AnyStructure): structure is StructureContainer {
    return structure instanceof StructureContainer
}

// 测试代码，验证 isContainer
function test() {
    const structs: AnyStructure[] = []
    const containers = structs.filter(isContainer)
    // containers 的类型为 StructureContainer[]
    type R = Expect<Equal<typeof containers, StructureContainer[]>>
}
        `,
        language: 'typescript',
        path: 'utils4.ts'
    }
]


const generalJudgeOptions = [
    {
        value: `import { isStructureType } from './utils5'
const room = Game.rooms['']
const containers = room.find(FIND_STRUCTURES, {
    filter: isStructureType(STRUCTURE_CONTAINER)
})
const ramOrWalls = room.find(FIND_STRUCTURES, {
    filter: isStructureType([STRUCTURE_RAMPART, STRUCTURE_WALL])
})
type R1 = Expect<Equal<typeof containers, StructureContainer[]>>
type R2 = Expect<Equal<typeof ramOrWalls, (StructureRampart | StructureWall)[]>>

export {}`,
        language: 'typescript',
        path: 'main5.ts' 
    }, 
    {
        value: `export function isStructureType<T extends StructureConstant>(
    type: T | T[],
) {
    return (s: AnyStructure): s is ConcreteStructure<T> => {
        if (Array.isArray(type)) {
            return type.includes(s.structureType as T)
        }
        return s.structureType === type
    }
}`,
        language: 'typescript',
        path: 'utils5.ts'
    }
]
</script>
