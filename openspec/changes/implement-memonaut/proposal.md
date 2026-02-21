## Why

个人经验散落各处、踩过的坑记不住、任务管理混乱、每天工作缺乏回顾。Memonaut（Memory + Astronaut）是一个基于 Obsidian vault + Claude Code SKILL 的个人 AI 记忆与经验管理系统，将经验知识、三层记忆体系、任务管理、每日简报、工作报告整合为完整的个人 Agent 系统。

## What Changes

- 新建完整的 Obsidian vault 模板目录结构（experiences/、memory/、tasks/、briefings/、reports/）
- 新建 `memo-init.mjs` 初始化脚本（创建 vault + 写入 ~/.memonaut.json）
- 新建 `memo-index.mjs` 索引生成脚本（扫描 experiences/ 生成 index.md）
- 新建 11 个 Claude Code SKILL 文件：
  - 经验管理：memo-search、memo-save、memo-index
  - 记忆管理：memo-remember、memo-distill、memo-rules、memo-archive
  - 任务管理：memo-task、memo-task-archive
  - 简报系统：memo-briefing
  - 工作报告：memo-report

## Capabilities

### New Capabilities
- `vault-init`: 初始化脚本和 vault 模板，创建目录结构和配置文件
- `experience-management`: 经验知识的搜索、保存和索引（memo-search、memo-save、memo-index）
- `memory-management`: 三层记忆体系的记录、提炼、规则管理和月记归档（memo-remember、memo-distill、memo-rules、memo-archive）
- `task-management`: 任务的添加、查看、完成和归档（memo-task、memo-task-archive）
- `briefing-report`: 每日简报生成和工作报告生成（memo-briefing、memo-report）

### Modified Capabilities
（无，这是全新项目）

## Impact

- **文件系统**：创建 skills/、scripts/、template/ 三个顶层目录
- **依赖**：Node.js（用于 memo-init.mjs 和 memo-index.mjs 跨平台脚本）
- **用户环境**：写入 ~/.memonaut.json 配置文件，创建 Obsidian vault 目录
- **Claude Code**：需要用户将 skills/ 目录配置为 Claude Code SKILL 路径
