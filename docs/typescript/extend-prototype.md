# 扩展原型对象

## 什么是原型对象

在 Screeps 中，所有游戏实体（如 creep、lab、flag 等）都是由类（构造函数）实例化而来。类名通常首字母大写（如 `Creep`），实例名则首字母小写（如 `creep`）。

实例的属性和方法由其构造函数的原型对象决定。

下面的例子演示了如何定义类型和构造函数，并说明了原型对象的作用。

<CodeEditor title="原型对象演示" :model-options="showPrototypeOptions" :editor-styles="{height: '440px'}"></CodeEditor>

在例子中，我们定义了 `Person` 类型和 `PersonConstructor` 类型，并声明了一个构造函数 `Person`。其中，`Person` 构造函数的类型为 `PersonConstructor`，而它的原型对象的类型为 `Person`。

Screeps 的设计也是如此：例如，`Creep` 构造函数的类型是 `CreepConstructor`，其原型对象的类型则是 `Creep`。这种设计让我们可以灵活地扩展游戏对象的属性和方法。

## 扩展 Screeps 原型对象

前文介绍了 `Creep` 构造函数及其原型对象的类型，其他游戏对象也遵循类似的模式。结合类型合并的知识，我们可以在模块中通过 `declare global` 扩展同名全局类型。

下面的例子演示了如何扩展 `Creep` 类型本身及其原型对象。

<CodeEditor title="扩展构造函数本身及原型对象" :model-options="extendPrototypeOptions" :editor-styles="{height: '420px'}"></CodeEditor>

需要注意的是，在 Screeps 中，除了 `RoomPosition` 等，我们无法通过构造函数直接创建游戏对象。因此，扩展构造函数本身的实际用途有限。

## 扩展 Game

`Game` 是一个单例对象，虽然名称以大写字母开头，但它并不是构造函数。与 `Creep` 不同，`Game` 的类型就是 `Game`，而不是 `GameConstructor`。

<CodeEditor title="扩展 Game" :model-options="extendGameOptions" :editor-styles="{height: '290px'}"></CodeEditor>

我们可以在 `Game` 对象上挂载全局方法和属性，便于数据共享和统一管理。

## 扩展 global（编写中）

在 Screeps 的 Node.js 环境中，`global` 对象类似于浏览器中的 `window`，用于全局作用域。你可以将工具函数、全局变量或通用逻辑挂载到 `global`，实现跨文件共享。同时也可以把一些缓存放在 `global` 中，减小 Memory 的占用。

常见用途包括：

- 挂载日志和调试工具
- 存储全局配置或缓存
- 提供通用方法（如路径查找、性能分析等）
- 挂载游戏对象的快捷访问方法

**TODO：不同 Node.js 版本对 `global` 的写法可能有差异，需要调研一下。**

<script setup>
import {CodeEditor} from '@components/monaco-editor'

const showPrototypeOptions = [
    {
        value: `interface Person {
    name: string
    age: number
    getInfo: () => string
}

interface PersonConstructor {
    new (name: string, age: number): Person
    prototype: Person
}

declare const Person: PersonConstructor
Person.prototype.getInfo = function () {
    return \`Name: \${this.name}, Age: \${this.age}\`;
}

const p = new Person('keqing', 18)
console.log(p.getInfo())
        `,
        language: 'typescript',
        path: 'main1.ts'
    }
]

const extendPrototypeOptions = [
    {
        value: `declare global {
    interface Creep {
        sleep: () => void
    }

    interface CreepConstructor {
        creepCount: number
    }
}

Creep.prototype.sleep = function () {
    this.say('Zzz...');
}

const creep = Game.creeps['']
creep.sleep()
Creep.creepCount++

export {}
        `,
        language: 'typescript',
        path: 'main2.ts'
    }
]

const extendGameOptions = [
    {
        value: `declare global {
    interface Game {
        getMyCreeps: (roomName: string) => Creep[]
    }
}

Game.getMyCreeps = function (this: Game, roomName) {
    return Object.values(this.creeps).filter(creep => creep.room.name === roomName);
}

const creeps = Game.getMyCreeps('W1N1');

export {}
        `,
        language: 'typescript',
        path: 'main3.ts'
    }
]


</script>
