# /memo-briefing — 生成/显示今日简报

## 触发词
`/memo-briefing`

## 核心流程

1. **定位 vault**：读取 `~/.memonaut.json` 获取 `vaultPath`
2. **读取任务**：读取 `{vaultPath}/tasks/todo.md` 中所有未完成任务
3. **按优先级分组**：紧急重要、重要不紧急、日常事项
4. **生成简报文件**：写入 `{vaultPath}/briefings/YYYY-MM-DD-简报.md`
5. **展示简报内容**
6. **周日额外提醒**：如果今天是周日，追加数据维护提醒

## 简报模板

```markdown
# 简报 YYYY-MM-DD

- **生成时间**: YYYY-MM-DD HH:MM

## 待办任务

### 紧急重要
- [ ] 任务...

### 重要不紧急
- [ ] 任务...

### 日常事项
- [ ] 任务...

## 统计
- 共 N 项待办
```
