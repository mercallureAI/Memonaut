# /memo-task-archive — 归档已完成任务

## 触发词
`/memo-task-archive`

## 核心流程

1. **定位 vault**：读取 `~/.memonaut.json` 获取 `vaultPath`
2. **读取 todo.md**：读取 `{vaultPath}/tasks/todo.md`
3. **提取已完成任务**：找出所有 `- [x]` 的任务行
4. **追加到归档**：写入 `tasks/archive/YYYY-MM-归档.md`（当月归档文件，不存在则创建）
5. **从 todo.md 移除**：删除已归档的 `- [x]` 行，写回 `todo.md`
6. **展示结果**：告知用户归档了多少条任务
