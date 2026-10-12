# Growth Rings · 最终递交版

这是已完成的**纯前端演示作品**。直接发布现有页面，不重新生成 UI，不添加后端、数据库或 AI API。

唯一仓库：https://github.com/Morii-si/growth-rings-v-final

## 给 REDcowork

1. Clone 本仓库，保留全部文件，执行：

```sh
npm ci
npm run build
```

2. 静态发布目录为 **`dist`**，入口为 `dist/index.html`。无需环境变量或 API Key。
3. 使用全新浏览器验收，然后返回预览链接和所用 commit SHA。

Node.js 24 推荐；支持 Node.js 20 及以上。开发预览用 `npm run dev`，构建后预览用 `npm run preview`。默认监听 `0.0.0.0:5173`，可用平台 `PORT` 或 `--port` 指定端口。

## 必须保留的内容

- 普通首次访问已内置完整 V3：**12 段对话记录、11 条用户发言及对应回复、4 条研究小结**。不需要先聊天或导入旧浏览器存档。
- V1/V2/V3 切换、讨论原文、资料来源、年轮 Logo 与所有图片。
- 聊天 → 生成看板 → 引用内容继续讨论 → 显式更新看板；刷新保留本机新增内容。
- “从开场演示”为独立空会话，返回后仍有完整作品。
- 保留当前布局、配色、文案和交互；不要恢复草稿页、待查事项或 AI 主动跟进。

后续对话使用前端预置回复与浏览器 localStorage，不调用真实 AI。首次展示所需的批准存档已编入前端脚本，**不能删除或替换**。

## 仓库为什么这么少

`index.html` 是入口；`assets/` 包含打包后的前端代码、样式、完整演示数据和图片；`tools.mjs` 只负责复制静态构建及本地预览，**不是产品后端**。没有运行或构建依赖，`npm run build` 不会重新生成页面。

本版以已验收的 v45.1 静态成品原样整理，移除了开发测试、历史过程文档及分散的开发模块。旧仓库无需再读取或合并。完整开发源码保留在 https://github.com/Morii-si/growth-rings-workbench-v45/tree/ui-v45.1 ，递交请只使用本仓库。

第三方许可随资源保留：Tabler Icons 位于 `assets/chat-icons/LICENSE`；React Bits Text Type 位于 `assets/third-party/REACT_BITS_LICENSE.txt`。请保留这些声明。
