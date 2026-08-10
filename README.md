# 孙菲潞 · 个人主页

个人主页站点源码。React 19 + Vite + Tailwind + shadcn/ui，单页（HashRouter），静态托管。

## 目录结构

```
.
├── app/                      # 站点源码（Vite 项目）
│   ├── src/content.ts        # 站点全部文案与数据，改内容基本只动这个文件
│   ├── src/sections/         # 首页各个板块
│   ├── src/assets/           # 站点实际用到的图片
│   └── scripts/              # 图片处理小工具（抠图、裁图标）
├── 孙菲潞-个人主页.html        # 单文件版产物，双击即可离线打开 / 发给别人
├── 素材/                      # 原始照片素材（不进 Git）
└── .github/workflows/        # 自动部署
```

## 本地开发

```bash
npm --prefix app install
npm --prefix app run dev
```

打开 http://localhost:3000

## 构建

普通构建（部署用，产物在 `app/dist/`）：

```bash
npm --prefix app run build
```

单文件构建（产物覆盖根目录那份 HTML，内联全部 JS/CSS/图片）：

```bash
cd app && npx tsc -b && npx vite build --config vite.config.singlefile.ts && cp dist/index.html "../孙菲潞-个人主页.html"
```

## 部署

推到 `main` 分支即自动部署到 GitHub Pages，工作流见 `.github/workflows/deploy.yml`。
在 Actions 页面也可以手动触发（Run workflow）。

```bash
git add -A && git commit -m "更新内容" && git push
```
