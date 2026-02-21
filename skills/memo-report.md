# /memo-report — 生成工作报告

## 触发词
`/memo-report <类型> [起始日期] [结束日期]`

## 参数
- `daily` — 日报（默认今天）
- `weekly` — 周报（默认本周）
- `monthly` — 月报（默认本月）
- `YYYY-MM-DD YYYY-MM-DD` — 自定义日期范围

## 核心流程

1. **定位 vault**：读取 `~/.memonaut.json` 获取 `vaultPath`
2. **解析日期范围**：根据类型或参数确定起止日期
3. **扫描数据源**：
   - `tasks/archive/` — 已完成任务（按日期过滤）
   - `tasks/todo.md` — 进行中任务
   - `memory/episodic/` — 情景记忆（按日期过滤）
   - `experiences/` — 新增经验条目（按日期过滤）
4. **汇总生成**：按模板生成报告
5. **写入文件**：`reports/YYYY-MM-DD-[类型]报告.md`
6. **展示内容**：输出报告供用户复制

## 报告模板

```markdown
# [日报/周报/月报] YYYY-MM-DD

- **周期**: YYYY-MM-DD ~ YYYY-MM-DD
- **生成时间**: YYYY-MM-DD HH:MM

## 完成事项
- 事项（来源：任务归档/情景记忆）

## 进行中
- 事项（当前状态）

## 关键收获
- 从情景记忆和经验条目中提炼

## 下一步计划
- 从待办任务中提取
```
