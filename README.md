# IEEEE — Institute of Embarrassing Engineering Experiments and Essays

官网静态站点，适用于 [GitHub Pages](https://pages.github.com/) 部署。

## 本地预览

在项目根目录启动任意静态服务器，例如：

```bash
# Python 3
python -m http.server 8000

# Node (若已安装 npx)
npx serve .
```

浏览器访问 `http://localhost:8000`。

## 部署到 GitHub Pages

1. 在 GitHub 新建仓库（如 `IEEEE` 或 `username.github.io`）。
2. 将本目录内容推送到该仓库。
3. 仓库 **Settings → Pages**：
   - **Source**: Deploy from a branch
   - **Branch**: `main`（或你的默认分支），根目录 `/ (root)`
4. 保存后等待构建，站点将出现在：
   - 若仓库名为 `username.github.io`：`https://username.github.io`
   - 否则：`https://username.github.io/IEEEE/`

若使用项目页（非 `username.github.io`），需在 **Settings → Pages** 中确认站点基路径；若站点在子路径，可在 `index.html` 中为资源链接加上 `<base href="/IEEEE/">`（将 `IEEEE` 换成你的仓库名）。

## 结构

- `index.html` — 单页结构（About / Research / People / Publications / Contact）
- `styles.css` — 样式与排版
- `main.js` — 导航折叠与滚动状态

## 许可

内容与代码的许可可单独声明；默认可沿用 MIT 或 CC-BY 等开放许可。
