# /memo-index — 重建经验索引

## 触发词
`/memo-index`

## 核心流程

1. **定位项目路径**：找到 memonaut 项目中的 `scripts/memo-index.mjs`
2. **执行脚本**：运行 `node {项目路径}/scripts/memo-index.mjs`
3. **展示结果**：告知用户索引已更新，显示扫描到的文件数量

## 说明

索引脚本会：
- 读取 `~/.memonaut.json` 定位 vault
- 扫描 `experiences/` 下所有 `.md` 文件
- 提取标题和标签
- 生成 `.memonaut/index.md`
