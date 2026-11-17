# 独立开发者全栈开发与云部署学习计划

> 文档版本：v1.0  
> 适用对象：希望系统学习全栈开发、云部署、Docker/镜像，最终能独立完成并上线产品的学习者  
> 默认主线：Next.js + TypeScript + Supabase + Vercel → Docker → VPS  
> 总周期：约 12 周（按每周 15–20 小时估算；全职可压缩到 6–8 周）  
> 核心原则：每一周都有可交付产出；先上线闭环，再加深技术；完成比学全重要。

---

## 目录

1. 学习目标
2. 技术栈对比与默认选型
3. 12 周总览
4. 每周固定学习节奏
5. 阶段 A：基础与工具链（第 1–2 周）
6. 阶段 B：全栈闭环（第 3–5 周）
7. 阶段 C：Docker 容器化（第 6–7 周）
8. 阶段 D：VPS 生产部署（第 8–9 周）
9. 阶段 E：真实产品迭代（第 10–12 周）
10. 第 1 周详细教程
11. 常见问题与处理
12. 阶段里程碑与检查清单
13. 刻意不做清单
14. 文档使用建议

---

## 1. 学习目标

### 1.1 终极目标

能够作为个人独立开发者，独立完成一个 Web 产品从**需求验证 → 开发 → 部署上线 → 备份监控 → 迭代维护**的完整闭环。

### 1.2 能力目标

完成本计划后，应具备以下能力：

- 使用 TypeScript 编写带类型检查的前后端代码；
- 使用 Next.js 构建带页面、路由、服务端逻辑和 API 的全栈应用；
- 使用 Supabase 完成数据库、用户认证和基础权限控制；
- 使用 Vercel 或 Railway 快速部署应用；
- 使用 Dockerfile 和 Docker Compose 容器化应用与数据库；
- 在 VPS 上使用 Docker + Caddy 部署带 HTTPS 的应用；
- 完成数据库备份、日志查看、健康检查和基础监控；
- 通过一个真实小产品走完“选题 → 验证 → MVP → 上线 → 观察”的循环。

### 1.3 产出目标

- 第 2 周末：本地可运行的 Next.js 页面，代码在 GitHub；
- 第 5 周末：带登录、数据读写、公网可访问的全栈应用；
- 第 7 周末：本地可用 `docker compose up` 跑起应用 + 数据库；
- 第 9 周末：通过自己的域名和 HTTPS 访问 VPS 上的应用，数据库有备份；
- 第 12 周末：一个有真实用户（哪怕 10 个）的线上小产品。

### 1.4 非目标

第一轮学习中刻意不追求：

- Kubernetes；
- 微服务拆分；
- 多语言混构后端；
- 自建消息队列；
- 自建身份认证系统；
- 企业级高并发架构。

这些是遇到具体问题时的工具，不是独立开发的入场券。

---

## 2. 技术栈对比与默认选型

### 2.1 前端 / 全栈框架

| 选项 | 适合场景 | 优势 | 代价 |
|---|---|---|---|
| Next.js（React） | 大多数 Web SaaS、工具站、SEO 敏感产品 | 全栈一体、Vercel 原生支持、AI 编码工具训练充分、模板生态最大 | 框架偏重，App Router 有学习曲线 |
| SvelteKit | 小型工具、性能敏感产品 | 代码量少、产物小、开发体验简洁 | 生态小于 React，遇到问题可搜方案少 |
| Nuxt（Vue） | 已熟悉 Vue 或偏好 Vue | 上手平缓、约定优于配置、全栈能力对标 Next.js | Vue 系在独立开发社区讨论热度低于 React |
| React + Vite | 纯 SPA、后台面板、不依赖 SEO | 灵活、架构透明 | 路由、SSR、API 层需自己解决 |

**默认建议：从 Next.js 起步。** 理由不是技术最优，而是遇到问题有人问、AI 能帮写、模板可参考，这三件事对 solo 开发节省的时间最大。

### 2.2 后端语言与框架

| 选项 | 定位 | 独立开发评价 |
|---|---|---|
| Node.js / TypeScript（Express / Fastify / Hono） | 全栈统一语言 | 前后端同语言，心智切换成本最低；最适合与 Next.js 搭配 |
| Python（FastAPI / Django） | AI/数据相关产品、快速原型 | FastAPI 适合 API-only MVP；Django 自带 Admin/ORM，CRUD 启动快；涉及 LLM、数据处理时优先 |
| Go（Gin / 标准库） | 高并发 API、单二进制部署 | 性能和部署好，但 MVP 阶段学习曲线和生态摩擦通常不划算 |

**一句话决策：** 产品和 AI/数据强相关 → Python；其余情况 → TypeScript/Node。Go 留到明确遇到性能瓶颈或想刻意学习时再碰。

### 2.3 数据库

| 选项 | 何时用 | 注意事项 |
|---|---|---|
| PostgreSQL | 绝大多数项目默认选择 | JSONB 可覆盖大部分 MongoDB 场景；全文搜索、pgvector 都在同一库解决；优先托管 Supabase/Neon |
| SQLite | 本地开发、单用户工具、边缘场景 | 零配置、单文件；不适合多用户高并发 Web 产品，但适合开发阶段或 Cloudflare D1 |
| MongoDB | 数据结构真正无模式且频繁剧烈变化 | 多数独立开发场景是过度选择；Postgres JSONB 已能处理大部分灵活 schema |

**默认路线：** PostgreSQL + 托管服务（Supabase 或 Neon）。开发阶段想零配置可先用 SQLite，上线前切 Postgres。

### 2.4 BaaS：Supabase vs Firebase

| 维度 | Supabase | Firebase |
|---|---|---|
| 数据模型 | PostgreSQL，完整 SQL | Firestore NoSQL；新增 Data Connect |
| 独立开发友好度 | 开源、可自托管、数据可迁移；Auth/存储/实时/Edge Functions 一体 | Google 生态、全托管、移动端体验好；vendor lock-in 更深 |
| 适合谁 | 想要传统后端手感 + SQL + 可迁移性 | 移动端 MVP、深度使用 Google 生态、不关心 schema 设计 |
| 免费额度 | 500MB Postgres，自带 Auth/存储/实时 | Spark 计划有限配额 |

**默认推荐 Supabase。** 它给你的仍然是 Postgres 和 SQL，学到的数据库技能通用可迁移。

### 2.5 部署与托管

| 平台 | 成本模型 | 最适合 | 体验 |
|---|---|---|---|
| Vercel | 免费 Hobby；Pro $20/月起 | Next.js、前端重度产品 | 推代码即上线，PR 预览，Next.js day-one 支持；注意 Spend Management |
| Railway | $5/月基础 + 按资源 | 需要 Docker 的全栈应用、自带 Postgres/Redis | Docker 友好，适合不想折腾但需要控制权 |
| Fly.io | 按秒计算，区域可选 | 多区域低延迟、长连接 | 灵活但配置略复杂 |
| Cloudflare Workers/Pages | 免费额度大 | 轻量全栈、边缘计算、成本敏感 | 配合 Hono/D1 可做极低成本全栈；运行时有限制 |
| 自托管 VPS（Hetzner/DigitalOcean） | $5–20/月固定 | 多项目复用、完全控制、可预测成本 | 学 Docker 的最佳实战场景，从 PaaS 毕业后的下一步 |

**建议路径：** Vercel 或 Railway 起步 → 需要更复杂环境或控制成本时，学 Docker + VPS 自托管。

### 2.6 容器化

**Docker 对独立开发者的核心价值：** 解决环境一致性问题；用 Compose 在本地拉起 Postgres + Redis + 应用的全栈环境。

需要掌握的边界：

1. 镜像与容器的区别；
2. `docker run`、`docker ps`、`docker logs`、`docker exec`；
3. 写 Dockerfile 打包 Node/Python 应用；
4. 用 Docker Compose 管理“应用 + 数据库 + 缓存”；
5. Volume 数据持久化；
6. 多阶段构建、合理 tag、不在镜像里塞密钥。

**Kubernetes：独立开发者大概率不需要。** Docker Compose 覆盖 90% solo 场景。把 K8s 当作以后有兴趣再了解的选项，不是必修项。

### 2.7 选型决策表

| 你的情况 | 推荐主线组合 |
|---|---|
| 零基础 / 想最快上线第一个产品 | Next.js + Supabase + Vercel → Docker → VPS |
| 已会 JavaScript/React | 同上，起步更快；可跳过前端基础 |
| 已会 Python，产品涉及 AI/数据 | FastAPI 或 Django + React/Vite + Supabase/Neon + Railway |
| 偏好 Vue 生态 | Nuxt + Supabase + Vercel/Railway |
| 想做移动端 App | React Native / Flutter + Supabase 或 Firebase；Docker/部署知识仍建议保留 |
| 预算极敏感 / 接近 $0 起步 | Next.js + Drizzle + Neon + Cloudflare Pages/Workers 或 Vercel Hobby |

### 2.8 关于 Java

Java 当然会用到，但在“独立开发、快速上线”目标下通常不是第一默认选项。

- Java/Spring Boot 的收益是稳定性和处理复杂系统的能力，但需要较高前期投入；
- 传统 Java 应用容器化常需额外做多阶段构建、jlink 裁剪 JRE、JVM 容器参数调优；
- 如果你已经是 Java 开发者，或产品从第一天起就需要复杂业务规则、严格类型安全、高并发/合规，Java 值得考虑；
- 对从零开始、目标尽快上线第一个产品的人，建议先用 TypeScript 或 Python 跑通闭环，把 Java 作为第二栈并行或后续升级。

---

## 3. 12 周总览

| 阶段 | 周次 | 核心任务 | 阶段末可交付物 |
|---|---|---|---|
| A. 基础与工具链 | 第 1–2 周 | TypeScript 最小必要知识 + Next.js 项目跑起来 | 本地可运行页面，推到 GitHub |
| B. 全栈闭环 | 第 3–5 周 | Next.js App Router + Supabase + 部署 Vercel | 带登录、能读写数据、公网可访问的应用 |
| C. Docker 容器化 | 第 6–7 周 | Docker 打包应用，Compose 管本地全栈 | `docker compose up` 跑起应用 + 数据库 |
| D. VPS 生产部署 | 第 8–9 周 | 租 VPS，Docker + Caddy 部署同一应用 | 自己的域名 + HTTPS 的生产环境 |
| E. 真实产品迭代 | 第 10–12 周 | 把前 9 周能力投到真实小产品 | 有真实用户的线上产品 |
| F. 之后按需 | 持续 | 备份、监控、成本优化、第二栈 | 可持续维护的独立开发基础设施 |

---

## 4. 每周固定学习节奏

| 块 | 时间占比 | 做什么 |
|---|---|---|
| 跟教程 / 读文档 | 30% | 只跟一个来源：Next.js 官方教程、Supabase Quickstart、Docker Get Started |
| 写自己的项目 | 50% | 把当周学的东西立刻用进应用；学不会的部分先绕过，不要卡住 |
| 整理与记录 | 20% | 把踩坑、命令写进 README 或笔记；周末检查“这周产出了什么” |

**每周只设一个“必须完成”的产出**，其余都是加分项。卡住时砍掉加分项，保住必须项。

---

## 5. 阶段 A：基础与工具链（第 1–2 周）

**阶段目标：** 本地有一个能跑的 Next.js 页面，代码在 GitHub 上。

### 第 1 周：TypeScript 最小必要知识 + 项目脚手架

**本周唯一产出：** 本地能跑的 Next.js 页面，代码在 GitHub。

按天清单：

- 第 1–2 天：环境与工具
  - 安装 Node.js LTS 和 VS Code；
  - 安装 Git，完成 `user.name` 和 `user.email` 配置；
  - `node -v`、`npm -v`、`git --version` 验证成功。
- 第 3–4 天：TypeScript 最小必要知识
  - 基础类型标注：`string` / `number` / `boolean` / 数组；
  - 函数参数和返回值类型；
  - `interface` 定义对象结构；
  - 不单独刷教程，后面在项目里边写边体会。
- 第 5 天：创建 Next.js 项目
  - 运行 `npx create-next-app@latest`，选择推荐默认项；
  - 理解 `app/page.tsx` 和 `app/layout.tsx`；
  - `npm run dev` 启动，浏览器看到页面。
- 第 6–7 天：改页面 + 推 GitHub
  - 修改 `page.tsx` 文字，确认热更新；
  - GitHub 创建空仓库，完成第一次 `git push`。

**第 1 周刻意不做：** 不学 RSC 深层原理、不学数据获取、不学认证、不碰数据库、不碰 Docker。

**周末检查点：**

1. `node -v` 和 `git --version` 正常；
2. 修改 `app/page.tsx` 后页面会变化；
3. GitHub 仓库能看到项目文件。

### 第 2 周：Next.js 核心概念 + Tailwind 上手

**具体动作：**

1. 学 Server Components vs Client Components：默认 Server Component，需要交互（`useState`、`onClick`）时加 `"use client"`；
2. 学数据获取：在 Server Component 里用 `async` 函数和 `await` 取数据；
3. 用 Tailwind 把页面做得“不太丑”：从间距、字号、颜色、flex 开始；
4. 可选引入 shadcn/ui 的 1–2 个组件，感受“复制代码进项目”的用法；
5. 加一个最简单的 API Route：`app/api/hello/route.ts` 返回 JSON，浏览器访问 `/api/hello` 确认响应。

**第 2 周刻意不做：** 不接真实数据库、不做认证、不学缓存和 Revalidating、不学中间件。

**第 2 周末检查点：** 能独立新建页面路由，在 Server Component 里取静态数据并渲染，Tailwind 做出基本布局，API Route 能返回 JSON。

---

## 6. 阶段 B：全栈闭环（第 3–5 周）

**阶段目标：** 做出一个带登录、能读写数据、公网可访问的完整应用。功能可极简，但必须端到端打通。

### 第 3 周：接入 Supabase（数据库 + Auth）

1. 创建 Supabase 项目，在 SQL Editor 建一张最简单的表（如 `todos`：`id`、`title`、`user_id`、`created_at`）；
2. 为表开启 Row Level Security（RLS），写策略让用户只能读写自己的数据；
3. 把 Supabase 接入 Next.js：可安装 `@supabase/supabase-js` 和 `@supabase/ssr`，或用 `npx create-next-app -e with-supabase` 模板后迁移页面代码；推荐后者，模板已配好客户端、环境变量和类型；
4. 实现注册 / 登录 / 登出：用邮箱密码方式即可；
5. 做一个只有登录后才能访问的页面，Server Component 读取当前用户，未登录则 `redirect` 到登录页。

**刻意不做：** RLS 高级策略、角色权限系统、第三方登录、忘记密码流程。

### 第 4 周：CRUD + Server Actions

1. 用 Server Actions 实现写入：表单提交调用 `"use server"` 函数，函数里用 Supabase 客户端做 `insert` / `update` / `delete`，然后 `revalidatePath` 刷新；
2. 实现完整 CRUD 闭环：列表展示、新建、删除或切换状态；只做一张表、一个核心操作；
3. 加 `middleware.ts` 保护路由：用 Supabase 的 `updateSession` 刷新会话，拦截 `/dashboard` 等路径；先跑通模板代码，再理解。

**第 4 周末检查点：** 本地能完成“注册 → 登录 → 看到自己的数据 → 新增 → 删除 → 登出”完整流程。

### 第 5 周：部署到 Vercel

1. 把 GitHub 仓库连接到 Vercel，在项目设置里填 Supabase 环境变量（`NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY` 等）；
2. 完成第一次生产部署，拿到 `*.vercel.app` 公网 URL；手机访问一次，确认认证和 CRUD 正常；
3. 了解 Vercel Hobby 边界：免费层面向个人、非商业用途，带宽约 100 GB/月，函数和构建有配额；收费或流量增长时考虑 Pro 或 VPS；
4. 写极简 README：项目做什么、用了什么栈、本地怎么跑、环境变量有哪些。

**阶段 B 里程碑：** 一个部署在 Vercel 上、带用户系统和数据读写的可访问应用。

---

## 7. 阶段 C：Docker 容器化（第 6–7 周）

**阶段目标：** 把阶段 B 应用装进容器，并用 Compose 在本地拉起完整栈。

### 第 6 周：Dockerfile + Next.js Standalone

1. 理解镜像 vs 容器，跑通 `docker run postgres` 在本地起临时数据库，用 `docker ps` / `docker logs` / `docker exec` 观察；
2. 在 `next.config.js` 加 `output: "standalone"`，本地 `npm run build`，确认 `.next/standalone/server.js` 可直接 `node server.js` 启动；
3. 写多阶段 Dockerfile：`deps` 装依赖，`builder` 构建，`runner` 只拷贝 standalone 产物、`static` 和 `public`，用非 root 用户运行，暴露 3000 端口；
4. 构建并本地运行：`docker build -t my-app .`，`docker run -p 3000:3000 --env-file .env.local my-app`，浏览器访问 `localhost:3000`。

**刻意不做：** Docker 网络原理、多架构构建、Docker Swarm、Kubernetes。

### 第 7 周：Docker Compose 完整本地栈

1. 写 `docker-compose.yml`，把“Next.js 应用 + Postgres 容器”放在一起；数据库用命名卷持久化；
2. 让应用在 Compose 网络里通过服务名连接数据库（如 `db:5432`），而不是 `localhost`；
3. 加 `/api/health` 路由返回 `200`，配置 healthcheck；
4. 验证：`docker compose up --build` 一条命令拉起应用 + 数据库，应用能正常登录和读写数据。

**阶段 C 里程碑：** 本地 `docker compose up` 完整跑起应用 + 数据库，不依赖宿主机安装的 Postgres。

---

## 8. 阶段 D：VPS 生产部署（第 8–9 周）

**阶段目标：** 用自己的域名，通过 HTTPS 访问部署在 VPS 上的容器化应用。

### 第 8 周：VPS + Docker + 应用上线

1. 租 $5–10/月 VPS（Hetzner、DigitalOcean、RackNerd 均可），选 Ubuntu 或 Debian，创建时加入 SSH 公钥；
2. 在 VPS 安装 Docker 和 Docker Compose，`git clone` 仓库，配置生产环境变量（不要提交 `.env`）；
3. 在 VPS 用 `docker compose up -d` 启动应用，先用 `http://服务器IP:3000` 确认可访问；数据库推荐先用 Supabase 托管版，把“部署应用”和“运维数据库”分开；
4. 学反向代理：Caddy 对新手最友好，`Caddyfile` 写 `你的域名 { reverse_proxy localhost:3000 }`，自动申请和续期 Let’s Encrypt 证书；域名 A 记录指向 VPS IP，启动 Caddy 后等 HTTPS 生效；
5. 对齐 Vercel 和 VPS 的环境变量，确认 Supabase 回调 URL 等配置正常。

### 第 9 周：备份、日志与“能自己修”的最小能力

1. 数据库备份：写 `pg_dump` 脚本，手动跑一次，确认导出 SQL；放进 cron，备份文件存到 VPS 之外；
2. 日志：学会 `docker compose logs -f`；
3. 基础监控：UptimeRobot 免费版监控域名 `/api/health`，宕机收邮件；
4. 恢复演练：假设数据库挂了，从备份文件恢复到新 Postgres 容器，手动做一遍并记录命令。

**阶段 D 里程碑：** 通过自己的域名、HTTPS 正常访问 VPS 上的应用，数据库有备份，健康检查在监控中。

---

## 9. 阶段 E：真实产品迭代（第 10–12 周）

**阶段目标：** 把前 9 周能力投到一个真实小产品上，走完“选题 → 验证 → 构建 → 上线 → 观察”循环。

### 第 10 周：选题 + 需求验证

1. 从自己痛点或身边人的重复性麻烦选题；标准是：你或 10 个具体的人现在就在用手动方式解决它；
2. 做一个落地页，一句话说清楚“帮谁、解决什么问题”，放邮箱收集框或“我想用”按钮，部署到 Vercel；先不要写完整应用；
3. 发到 2–3 个相关社区或群组，目标不是爆，而是收到 5 个真实反馈或邮箱；没有反馈就换选题，不要硬做。

### 第 11–12 周：最小 MVP + 上线

1. 只做落地页承诺的那一个核心功能，其他想法放进 WON'T 清单；
2. 复用阶段 B 的代码结构（认证、CRUD、部署配置），把时间花在产品逻辑上；
3. 第 11 周末上线到 Vercel 或 VPS（收费则 Vercel Hobby 不符合条款，应走 VPS 或升级 Pro）；
4. 上线后先不大改，观察 1–2 周：有没有人用、在哪流失、有没有人愿意付费或推荐。

**阶段 E 里程碑：** 一个公网上、有真实用户（哪怕 10 个）在用的产品。

---

## 10. 第 1 周详细教程

### 10.1 第 1–2 天：环境与工具

#### Node.js 安装与验证

1. 打开 [nodejs.org](https://nodejs.org)，下载 LTS 版本；
2. Windows 双击 `.msi`，一路 Next；确认勾选：
   - Node.js runtime；
   - npm package manager；
   - Add to PATH（最关键）；
3. macOS 双击 `.pkg`，一路继续；
4. 安装完成后打开终端，运行：
   ```bash
   node -v
   npm -v
   ```
   两个命令都输出版本号即成功。若 `node -v` 报 command not found，Windows 常见原因是漏勾 Add to PATH，重新运行安装包 Repair 或卸载重装并勾选。

#### VS Code 安装与扩展

去 [code.visualstudio.com](https://code.visualstudio.com) 下载安装。Windows 建议勾选 “Add to PATH” 和 “Add ‘Open with Code’ action”。

必装 4 个扩展：

| 扩展 | 作用 |
|---|---|
| ESLint | 实时标出 JS/TS 语法和规范问题 |
| Prettier - Code formatter | 保存时自动格式化 |
| Tailwind CSS IntelliSense | Tailwind 类名自动补全 |
| ES7+ React/Redux/React-Native snippets | 快速生成 React 组件模板 |

开启保存时自动格式化：`Ctrl+Shift+P`（macOS `Cmd+Shift+P`）→ 输入 “Open User Settings (JSON)” → 加入：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2
}
```

#### Git 安装与身份配置

- Windows：去 [git-scm.com](https://git-scm.com) 下载，一路默认；安装后有 “Git Bash Here”；
- macOS：终端输入 `git --version`，按提示安装，或 `brew install git`。

验证：

```bash
git --version
```

一次性配置身份：

```bash
git config --global user.name "你的名字或GitHub用户名"
git config --global user.email "你的GitHub注册邮箱"
```

验证：

```bash
git config --global --list
```

应看到 `user.name` 和 `user.email`。

#### GitHub 创建空仓库并推送

1. GitHub 右上角 “+” → “New repository”；
2. 填 Repository name，选 Public；
3. **不要勾选** Add a README、Add .gitignore、Choose a license；
4. 创建后复制 HTTPS 地址。

生成 Personal Access Token：

1. 头像 → Settings；
2. 左侧最底 Developer settings；
3. Personal access tokens → Tokens (classic) → Generate new token (classic)；
4. 备注如 `my-first-push`，Expiration 选 30 天；
5. 权限只勾 `repo`；
6. 生成后立刻复制 Token，离开页面看不到。

在本地项目根目录执行：

```bash
git init
git add .
git commit -m "Initial commit: Next.js project setup"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

`git push` 时：
- Username：GitHub 用户名；
- Password：粘贴 Personal Access Token，不是登录密码。粘贴时终端不显示字符是正常安全行为。

#### create-next-app 选项说明

运行：

```bash
npx create-next-app@latest
```

第一周直接选择 “Yes, use recommended defaults”。推荐默认通常包含 TypeScript、ESLint、Tailwind CSS、App Router、Turbopack 开发时、import alias `@/*`。

非交互一步生成：

```bash
npx create-next-app@latest my-app --yes
```

项目名只能用小写字母、数字和连字符。

### 10.2 第 3–4 天：TypeScript 最小必要知识

#### 基础类型

| 类型 | 标注写法 | 例子 |
|---|---|---|
| `string` | `let name: string` | `"Alice"` |
| `number` | `let age: number` | `25`、`3.14` |
| `boolean` | `let isActive: boolean` | `true` / `false` |

**始终写小写** `string` / `number` / `boolean`，不要写大写 `String` / `Number` / `Boolean`。

数组：

```typescript
let skills: string[] = ["TypeScript", "Docker"];
let scores: number[] = [90, 85, 78];
```

第一周统一用 `string[]`，少记 `Array<string>`。

`any` 会关闭类型检查，新项目尽量不用。

#### 函数

```typescript
function greet(name: string, age: number): string {
  return `Hello, ${name}, you are ${age}`;
}

function logMessage(message: string): void {
  console.log(message);
}
```

函数参数一定要标类型；简单函数返回值可推断，但第一周建议显式写返回类型。

#### Interface

```typescript
interface User {
  name: string;
  age: number;
  isAdmin?: boolean;
}

const user: User = {
  name: "Alice",
  age: 25,
};
```

`?` 表示可选字段。第一周描述对象形状用 `interface` 即可；`type` 的更多能力以后需要时再学。

#### 四个新手坑

1. 把变量类型标成 `String` 而不是 `string`；
2. 函数参数漏标类型；
3. 对象字段拼写错误；
4. 以为 `let x = 25` 必须写 `let x: number = 25`。TypeScript 有类型推断，变量声明可让推断发挥作用，但函数参数必须手动标。

#### 小练习

打开 [TypeScript Playground](https://www.typescriptlang.org/play)，敲：

```typescript
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function createTodo(title: string): Todo {
  return {
    id: Date.now(),
    title: title,
    completed: false,
  };
}

const myTodo: Todo = createTodo("学习 TypeScript");
console.log(myTodo.title);
```

故意把 `title: title` 改成 `title: 123`，或在 `myTodo` 上访问 `myTodo.dueDate`，观察红线。

### 10.3 第 5 天：创建并启动 Next.js 项目

1. 终端 `cd` 到代码目录，运行：
   ```bash
   npx create-next-app@latest
   ```
   选择推荐默认项；或：
   ```bash
   npx create-next-app@latest my-app --yes
   ```
2. 进入项目：
   ```bash
   cd my-app
   code .
   ```
3. 认识三个关键位置：
   - `app/`：文件夹定义 URL 路径，文件定义该路径 UI；
   - `app/page.tsx`：根路径 `/` 页面，默认导出 React 组件；
   - `app/layout.tsx`：根布局，包裹所有页面，必须包含 `<html>` 和 `<body>`；`page.tsx` 内容放进 `layout.tsx` 的 `<main>{children}</main>`。
   另需知道：`public/` 放静态资源；`package.json` 放依赖和脚本。
4. 启动：
   ```bash
   npm run dev
   ```
   看到 `http://localhost:3000` 即成功。浏览器访问。
5. 验证热更新：打开 `app/page.tsx`，把一段文字改成：
   ```tsx
   <p className="text-lg text-gray-600">
     这是我的第一个全栈项目，第 5 天。
   </p>
   ```
   保存后浏览器应自动更新；若没自动更新，先确认 dev server 在运行，再手动刷新。

**第 5 天刻意不做：** 不逐行理解默认页面代码；不学 Server/Client 深层区别；不学数据获取、API Route、Tailwind 进阶；不碰 GitHub 推送。

**第 5 天完成标准：**

1. `npm run dev` 能启动，`localhost:3000` 能看到页面；
2. 修改 `app/page.tsx` 后页面变化；
3. 能说出 `app/page.tsx` 和 `app/layout.tsx` 各自负责什么。

---

## 11. 常见问题与处理

### 11.1 项目创建到 C 盘，依赖也在 C 盘，能改到其他目录吗？

可以。项目内的 `node_modules` 会跟着项目走；C 盘真正的大头通常是 npm 全局包和缓存。

步骤：

1. 停止 `npm run dev`（`Ctrl + C`）；
2. 完全关闭 VS Code、所有终端窗口；
3. 文件资源管理器切出项目目录；
4. 任务管理器结束残留 `node.exe` / Node.js 进程；
5. 剪切项目文件夹到目标盘，如 `D:\Projects\`；
6. 在新目录运行 `npm install` 修复依赖路径；
7. `npm run dev` 验证。

若提示“文件在其他程序打开”，不要硬移。用 robocopy 只复制源码：

```bash
robocopy "C:\你的路径\my-app" "D:\Projects\my-app" /E /XD node_modules .next
cd /d D:\Projects\my-app
npm install
npm run dev
```

确认新位置能跑后，再删 C 盘旧目录；删不掉可重启电脑后第一时间删除。

迁移 npm 全局资源：

```bash
mkdir D:\nodejs\node_global
mkdir D:\nodejs\node_cache
npm config set prefix "D:\nodejs\node_global"
npm config set cache "D:\nodejs\node_cache"
```

然后在系统环境变量 `Path` 中添加：
- `D:\nodejs\node_global`
- `D:\nodejs\node_global\node_modules\.bin`

可选新建系统变量 `NODE_PATH` = `D:\nodejs\node_global\node_modules`。关闭所有终端后重新打开，验证：

```bash
npm config get prefix
npm config get cache
npm root -g
```

三条都应指向 D 盘路径。

### 11.2 Node.js 本体建议安装在哪里？

建议保留 C 盘默认位置。Node.js 本体通常只有几十 MB，真正占空间的是全局包和缓存，而它们已经迁到 D 盘。保留默认位置可避免权限和环境冲突。

如果确实想迁本体，推荐用 `nvm-windows` 管理版本，并把 nvm 和 Node 版本放在 D 盘（路径不含中文和空格），例如 `D:\nvm`。但当前学习阶段不必折腾。

### 11.3 npm 提示 moderate severity vulnerabilities 怎么办？

当前学习阶段可安全忽略，不要运行 `npm audit fix --force`。

- `npm audit fix` 只在 `package.json` 允许范围内升级，通常较安全，但未必能修复；
- `npm audit fix --force` 会跨大版本升级甚至降级，可能让项目跑不起来；
- 想尝试时先建分支：`git checkout -b try-audit-fix`，运行 `npm audit fix`（不加 `--force`），启动项目确认正常；有问题删分支即可。

准备正式上线、接受真实用户访问时，再系统处理依赖安全。

---

## 12. 阶段里程碑与检查清单

| 阶段 | 里程碑 | 检查方式 |
|---|---|---|
| A | 本地 Next.js 页面，代码在 GitHub | `npm run dev` 正常；改 `page.tsx` 页面变化；GitHub 有仓库 |
| B | Vercel 上带登录和数据读写的应用 | 手机访问公网 URL，完成注册/登录/新增/删除/登出 |
| C | 本地 Compose 跑起应用 + 数据库 | `docker compose up --build` 后应用可用，重启容器数据不丢 |
| D | 域名 + HTTPS 访问 VPS 应用 | 浏览器 HTTPS 正常；`docker compose logs -f` 可看日志；UptimeRobot 监控 `/api/health`；完成一次备份恢复演练 |
| E | 有真实用户的线上小产品 | 至少 10 个真实用户或 5 个真实反馈；能根据反馈迭代 |

---

## 13. 刻意不做清单

| 阶段 | 刻意不做 | 原因 |
|---|---|---|
| A | 不学 RSC 深层原理、不接数据库、不碰 Docker | 没有页面时只会增加认知负担 |
| B | 不做 OAuth / 忘记密码 / 角色权限、不学缓存高级用法 | MVP 认证只需能登录、能保护页面 |
| C | 不学 K8s、不追求镜像极致缩小、不学多阶段以外构建技巧 | Compose 覆盖 90% solo 场景 |
| D | 不自建数据库、不上复杂监控栈、不做全自动 CI/CD | 先把手动部署、备份、恢复跑通 |
| E | 不为技术优雅重写、没有用户反馈前不加功能 | 第一个产品目标是验证，不是完美 |

---

## 14. 文档使用建议

1. 复制本文档，保存为 `fullstack-indie-dev-plan.md`；
2. 用 VS Code 打开，按周勾选完成项；
3. 每周日回答三个问题：
   - 这周的“必须产出”完成了吗？
   - 哪个地方卡住了？下周是否需要绕过？
   - 下周唯一必须完成的事情是什么？
4. 需要 PDF 时，用浏览器打开 Markdown 预览页，打印 → 另存为 PDF。

**核心逻辑：** 每一周都有一个能看见、能访问、能验证的产出，而不是“学完一个阶段再进入下一个阶段”。从第 1 周直接开始：`npx create-next-app@latest`，选 TypeScript + App Router + Tailwind，然后打开 Next.js 官方 Getting Started 第一页。