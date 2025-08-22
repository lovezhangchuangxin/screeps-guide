# 使用装饰器

## 什么是装饰器

装饰器（Decorator）是 TypeScript 的一个实验性特性，可以为类、类的属性、方法等添加元数据或修改行为。它常用于依赖注入、日志、权限校验等场景。

在 Screeps 项目中，装饰器可以帮助我们更优雅地管理代码结构，比如自动注册任务、标记特殊 creep、收集统计信息等。

## 启用装饰器

首先需要在 `tsconfig.json` 中开启装饰器支持：

```json
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```

装饰器的详细知识请参考 [官方文档](https://www.typescriptlang.org/docs/handbook/decorators.html)

下面介绍一些应用场景。

## 示例：为 creep 行为添加日志

假设我们希望在执行某个方法时自动打印日志，可以这样实现：

<CodeEditor title="方法装饰器日志示例" :model-options="logDecoratorOptions" :editor-styles="{height: '320px'}" />

## 示例：控制函数执行频率

有时候我们希望函数每隔一定时间才会执行一次：

<CodeEditor title="控制函数执行频率示例" :model-options="intervalDecoratorOptions" :editor-styles="{height: '530px'}" />

## 示例：自动注册任务

装饰器还可以用于自动收集和注册任务：

<CodeEditor title="自动注册任务示例" :model-options="taskDecoratorOptions" :editor-styles="{height: '500px'}" />

## 注意事项

- 装饰器目前为实验性特性，未来语法可能有变动。
- Screeps 的运行环境为 ES5，需确保编译输出兼容。
- 装饰器适合用于元数据收集、自动注册等场景，不建议滥用。

## 参考资料

- [TypeScript 装饰器官方文档](https://www.typescriptlang.org/docs/handbook/decorators.html)

<script setup>
import { CodeEditor } from '@components/monaco-editor';

const logDecoratorOptions = [
  {
    value: `function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\`[\${this.name}] 执行: \${propertyKey}\`, ...args);
    return original.apply(this, args);
  };
}

export class RoomManager {
  @Log
  launchNuke(roomName: string) {}
}
`,
    language: 'typescript',
    path: 'main.ts',
  },
];

const intervalDecoratorOptions = [
  {
    value: `const isInterval = (interval: number) => {
  return Game.time % interval === 0;
};

function interval(time: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const origin = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (!isInterval(time)) return;
      return origin.apply(this, args);
    };
  };
}

export class RoomManager {
  @interval(1000)
  scan() {}
}
`,
    language: 'typescript',
    path: 'main.ts',
  },
];

const taskDecoratorOptions = [
  {
    value: `const tasks: Function[] = [];

function Task(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  tasks.push(descriptor.value);
}

export class TaskManager {
  @Task
  static harvest() {}

  @Task
  static build() {}
}

// 在主循环中遍历所有任务
tasks.forEach((task) => task());
`,
    language: 'typescript',
    path: 'main.ts',
  },
];
</script>
