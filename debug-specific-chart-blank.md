[OPEN] specific-chart-blank

# 症状

- 页面 `http://localhost:5175/specific-chart.html` 刷新后出现白屏。
- 预期应展示 3 张图表的合并页。

# 假设

1. 引入 `@cloud-materials/charts-common` 后，第三张图在浏览器端抛出运行时异常，导致 React 根节点整体挂载失败。
2. `CChart histogram` 当前配置项与本地安装版本不兼容，初始化时直接报错。
3. `charts-common` 在 Vite 开发环境下存在依赖或样式加载问题，导致刷新时白屏。
4. 页面已经挂载，但被异常布局或尺寸样式覆盖成看似空白。

# 当前状态

- 已建立调试会话，等待收集运行时证据。
