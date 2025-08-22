# Screeps 指南

这是一个关于 Screeps MMO 策略游戏的 typescript 指南，包括：

- ts 简单入门
- screeps 中如何扩展全局类型
- 如何扩展原型
- 类型断言

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

欢迎通过以下方式参与本指南的完善：

- 提交 **Pull Request** 来改进文档内容
- 创建 **Issue** 报告问题或建议新功能  
- 参与 **GitHub Discussions** 进行社区讨论和经验分享

关于如何开启和使用 GitHub Discussions，请参阅[如何开启 GitHub Discussions](https://lovezhangchuangxin.github.io/screeps-guide/how-to-enable-discussions.html) 文档。

## 许可证

本项目采用 MIT 许可证。
