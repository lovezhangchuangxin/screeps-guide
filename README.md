# Screeps 指南

这是一个关于 Screeps MMO 策略游戏的 typescript 指南，包括：

1. [定义 Memory 类型](docs/typescript/define-memory.md)
2. [扩展原型对象](docs/extend-prototype.md)
3. [类型断言与类型收束](docs/type-assertion.md)
4. [如何贡献文档](docs/how-to-contribute.md)

## 安装

首先，克隆仓库并安装依赖：

```bash
git clone https://github.com/lovezhangchuangxin/screeps-guide.git
cd screeps-guide
pnpm install
```

## 开发

启动开发服务器：

```bash
pnpm docs:dev
```

这将启动 VitePress 开发服务器，并在默认浏览器中打开文档。

## 构建

构建生产环境文档：

```bash
pnpm docs:build
```

构建后的文档会输出到 `dist` 目录。

## 预览

预览构建后的文档：

```bash
pnpm docs:preview
```

这会启动本地服务器以预览构建后的文档。

## 贡献

欢迎通过提交 Pull Request 或 Issue 参与本指南的完善。

## 许可证

本项目采用 MIT 许可证。
