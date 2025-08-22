# 解析身体部件

在 Screeps 中当我们使用 spawn 的 `spawnCreep` 孵化爬的时候，需要传入一个 body 数组，比如 `[WORK, CARRY, MOVE]`。在数组很长的时候，写起来很不方便，我们需要一些方法能简化写法。

下面提供一种思路：

## 字符串编码 body

我们可以使用一个字母表示一种 bodypart，字母后面跟数字表示该 bodypart 的数量。

下面代码列出来每个字母代表的 bodypart：

```ts
export const charBodyPartMap = {
  m: MOVE,
  w: WORK,
  a: ATTACK,
  c: CARRY,
  h: HEAL,
  r: RANGED_ATTACK,
  t: TOUGH,
  l: CLAIM,
};
```

于是乎，`w1c1m2` 就表示 `[WORK, CARRY, MOVE, MOVE]`，`cm2` 就表示 `[CARRY, CARRY, MOVE, MOVE]`。

## 解析函数

接下来考虑写一个函数来将字符串转为 body 数组。由于字符串写法过于精简，有时候不太方便看解析后的结果。因此我会先将字符串转为多维数组，再将多维数组转换 body 数组。

比如说对于 `t10r10h20m10`，先转为 `[[TOUGH, 10], [RANGED_ATTACK, 10], [HEAL, 20], [MOVE, 10]]`，这样看起来一目了然，然后再转为完整的 body 数组用来 `spawnCreep`。

下面 utils 中是第一个转换的解析函数实现，第二个函数请读者自行实现。
`main.ts` 中展示了解析函数 `parseStrToBody` 的用法。当你把鼠标放在变量或者函数上有类型提示，可以清楚看到解析后的结果。

<CodeEditor title="Screeps游戏代码" :model-options="parseStringOptions" :editor-styles="{height: '500px'}"></CodeEditor>

<script setup>
import { ref } from 'vue'
import {CodeEditor} from '@components/monaco-editor'

const parseStringOptions = ref([
    {
        value: ``,
        language: 'typescript',
        path: 'main.ts'
    },
    {
        value: ``,
        language: 'typescript',
        path: 'utils.ts'
    }
])

import('@codes/typescript/parseStrToBody.ts?raw').then(({default: code}) => {
    parseStringOptions.value[1].value = code;
    parseStringOptions.value[0].value = `
import { parseStrToBody } from './utils';

// 鼠标放在变量或者函数上有类型提示，可以清楚看到解析后的结果
const body1 = parseStrToBody('t10r10h20m10');
const body2 = parseStrToBody('w10cm10');
`;
})
</script>
