# Memonaut — 个人 AI 记忆与经验管理系统

Memory + Astronaut，记忆航行者。基于 Obsidian vault + Claude Code SKILL 的个人 Agent 系统。

## 特性

- 经验知识库（搜索/保存/索引）
- 三层记忆体系（情景/语义/强制规则）
- 任务管理（添加/完成/归档）
- 每日简报 & 工作报告（日报/周报/月报）
- 纯 Markdown，Obsidian 原生可读

## 安装

```bash
git clone https://github.com/xxx/memonaut.git
node memonaut/scripts/memo-init.mjs [可选: vault路径]
```

默认 vault 路径：`~/memonaut-vault`，配置写入 `~/.memonaut.json`。

## 配置 Claude Code SKILL

将 `skills/` 目录添加到 Claude Code 的 SKILL 搜索路径。

## 命令一览

| 命令 | 说明 |
|------|------|
| `/memo-search <关键词>` | 搜索经验知识 |
| `/memo-save` | 保存新经验 |
| `/memo-index` | 重建经验索引 |
| `/memo-remember` | 记录情景记忆 |
| `/memo-distill [范围]` | 提炼语义记忆 |
| `/memo-rules [add]` | 查看/添加强制规则 |
| `/memo-archive` | 月记合并 |
| `/memo-task [add/done]` | 任务管理 |
| `/memo-task-archive` | 归档已完成任务 |
| `/memo-briefing` | 今日简报 |
| `/memo-report <类型>` | 生成工作报告 |

## License

MIT
