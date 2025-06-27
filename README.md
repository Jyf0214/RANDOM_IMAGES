# RANDOM_IMAGES
# 随机图站点 (Random Image Site on Cloudflare)

[![Deploy to Cloudflare Pages](https://static.cloudflareinsights.com/pages/button.svg)](https://deploy.workers.cloudflare.com/?url=https://github.com/Jyf0214/RANDOM_IMAGES)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个基于 Cloudflare Pages + Workers + KV 搭建的、高性能、零成本的随机图片展示站点。**所有操作均可在 Cloudflare 网站上完成，无需任何命令行工具。**

## ✨ Demo

**[查看动态演示](没有：))**  


## 🌟 功能特性

- **分类随机图片**：提供“竖屏”和“横屏”两个分类，点击按钮即可在新标签页打开一张对应分类的随机图片。
- **基于 Cloudflare 全家桶**：前端由 Pages 托管，后端逻辑由 Workers 处理，图片链接存储在 KV 中，实现了完全的 Serverless 架构。
- **极速响应**：所有资源均通过 Cloudflare CDN 全球分发，访问速度快。
- **100% 网页操作**：从部署到数据管理，全程只需在 Cloudflare 控制台点击鼠标，无需编写任何命令。
- **零成本运维**：完全利用 Cloudflare 的免费套餐额度，个人使用几乎无成本。

## 🛠️ 技术栈

- **前端托管**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **后端服务**: [Cloudflare Workers](https://workers.cloudflare.com/)
- **数据存储**: [Cloudflare KV](https://www.cloudflare.com/developer-platform/kv/)
- **开发框架**: 无特定框架，使用原生 HTML/CSS/JavaScript

## 🚀 部署指南 (纯网页版)

按照以下步骤，你可以在5分钟内拥有一个属于自己的随机图站点。

### 第1步：准备代码

点击本仓库右上角的 **"Fork"** 按钮，将此仓库复刻到您自己的 GitHub 账号下。

### 第2步：在 Cloudflare 创建 KV 数据库

1.  登录 [Cloudflare 控制台](https://dash.cloudflare.com/)。
2.  在左侧主导航栏中，点击 **Workers & Pages**。
3.  在右侧的二级菜单中，点击 **KV**。
4.  点击 **Create a namespace** (创建命名空间) 按钮。
5.  在 **Namespace name** 输入框中，准确输入 `IMAGE_KV`，然后点击 **Add**。

    

### 第3步：部署到 Cloudflare Pages

1.  回到 **Workers & Pages** 的主概览页面。
2.  点击 **Create application** -> **Pages** -> **Connect to Git**。
3.  选择您刚刚 Fork 的 GitHub 仓库并授权。
4.  在 **Build settings** 步骤中，无需任何修改，直接点击 **Save and Deploy**。
5.  等待首次部署完成。
6.  📌 **(最关键一步)** 进入刚创建好的 Pages 项目，点击 **Settings** -> **Functions**。
7.  向下滚动到 **KV namespace bindings**，点击 **Add binding**。
    - **Variable name**: `IMAGE_KV` (变量名必须是这个)
    - **KV namespace**: 从下拉菜单中选择上一步创建的 `IMAGE_KV`。
8.  点击 **Save**。你的后端函数现在已经和数据库关联起来了！

### 第4步：添加图片链接 (在网页上操作)

1.  再次回到 **Workers & Pages** -> **KV** 页面，找到并点击你创建的 `IMAGE_KV`。
2.  你现在进入了数据管理界面。点击 **Add entry** (添加条目)。
3.  **添加竖屏图片**:
    - 在 **Key** 字段中输入: `vertical_images`
    - 在 **Value** 字段中，粘贴你的图片URL列表，**格式必须是JSON数组字符串**。例如：
      ```json
      ["https://example.com/v1.jpg", "https://example.com/v2.webp"]
      ```
    - 点击 **Save**。
4.  **添加横屏图片**:
    - 再次点击 **Add entry**。
    - 在 **Key** 字段中输入: `horizontal_images`
    - 在 **Value** 字段中，粘贴你的横屏图片URL列表。例如：
      ```json
      ["https://example.com/h1.png", "https://example.com/h2.jpg"]
      ```
    - 点击 **Save**。

    

### 第5步：完成！

访问你的 Pages 域名 (例如 `your-project-name.pages.dev`)，你的随机图站点现在已经可以正常工作了！如果之后需要增删图片，只需回到 KV 管理界面编辑对应的 Value 即可。

## 📚 API 文档

本项目通过 Cloudflare Workers 提供了两个简单的 API 端点：

### 1. 获取背景图列表

- **URL**: `GET /api/images`
- **描述**: 从 KV 中随机获取所有分类下的图片，打乱后返回一个包含最多30个图片URL的JSON数组，用于前端背景墙的渲染。

### 2. 获取随机图片（重定向）

- **URL**: `GET /api/random?type=<category>`
- **描述**: 根据提供的 `type` 参数，从对应分类中随机选择一张图片，并返回一个 `302 Found` 重定向到该图片的URL。
- **参数**:
  - `type` (可选): 图片分类。`vertical` (竖屏) 或 `horizontal` (横屏)。如果未提供，默认为 `vertical`。

## 🤝 如何贡献

欢迎提交 Pull Request 或创建 Issue 来为这个项目做出贡献！

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源。