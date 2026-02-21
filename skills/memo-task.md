# /memo-task — 任务管理

## 触发词
- `/memo-task` — 查看当前任务清单
- `/memo-task add <描述>` — 添加新任务
- `/memo-task done <ID>` — 标记任务完成

## 核心流程

### 无参数：查看任务
1. **定位 vault**：读取 `~/.memonaut.json` 获取 `vaultPath`
2. **读取 todo.md**：读取 `{vaultPath}/tasks/todo.md`
3. **展示任务**：按优先级分组显示

### `add <描述>`：添加任务
1. 读取 `tasks/todo.md`
2. 生成 3 位十六进制短 ID（如 `#a3f`），确保不与已有 ID 重复
3. AI 判断优先级分类（紧急重要/重要不紧急/日常事项）
4. 追加到对应分组：`- [ ] #ID 描述 | 标签: xxx | 创建: YYYY-MM-DD`
5. 写回 `tasks/todo.md`

### `done <ID>`：完成任务
1. 读取 `tasks/todo.md`
2. 找到匹配 ID 的任务行，将 `- [ ]` 改为 `- [x]`
3. 写回 `tasks/todo.md`
