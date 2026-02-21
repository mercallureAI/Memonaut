# /memo-remember — 记录情景记忆

## 触发词
`/memo-remember`

## 核心流程

1. **定位 vault**：读取 `~/.memonaut.json` 获取 `vaultPath`，若不存在则使用 `~/memonaut-vault`
2. **引导描述**：询问用户：
   - 发生了什么事件？
   - 上下文是什么？
   - 结果/收获是什么？
   - 标签（关键词）
3. **生成文件**：使用当前日期，写入 `{vaultPath}/memory/episodic/YYYY-MM/MMDD-简短描述.md`
4. **确保目录存在**：若 `YYYY-MM/` 子目录不存在则创建

## 文件模板

```markdown
# MMDD 简短描述

- **日期**: YYYY-MM-DD
- **标签**: 关键词

## 事件
## 上下文
## 结果/收获
```
