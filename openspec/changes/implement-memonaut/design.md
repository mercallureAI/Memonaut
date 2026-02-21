## Context

Memonaut 是一个全新的开源项目，基于 Obsidian vault 作为存储层，Claude Code SKILL 作为交互层。用户在任意工作目录下通过 SKILL 命令与系统交互，系统通过 `~/.memonaut.json` 定位 vault 路径。

技术栈：纯 Markdown 文件 + Node.js 脚本（跨平台）+ Claude Code SKILL（Markdown prompt）。

## Goals / Non-Goals

**Goals:**
- 提供完整的 vault 初始化流程（一条命令创建所有目录和模板文件）
- 11 个 SKILL 覆盖经验管理、记忆管理、任务管理、简报和报告五大模块
- 跨平台支持（Windows/macOS/Linux），脚本使用 Node.js
- 所有文件纯 Markdown，Obsidian 原生可读

**Non-Goals:**
- Obsidian 插件开发
- Web UI
- 语义搜索（embedding）
- 多设备同步
- Claude Code Hooks 自动触发

## Decisions

### 1. Vault 路径发现：配置文件 + 默认路径
- 优先读取 `~/.memonaut.json` 的 `vaultPath` 字段
- 回退到默认路径 `~/memonaut-vault`
- 理由：简单可靠，用户可自定义路径

### 2. 脚本语言：Node.js (ESM)
- `memo-init.mjs` 和 `memo-index.mjs` 使用 Node.js
- 理由：跨平台，无需额外依赖，用户大概率已安装 Node.js

### 3. SKILL 文件结构：每个命令一个独立 .md 文件
- 11 个 SKILL 文件放在 skills/ 目录
- 每个 SKILL 内嵌 vault 路径发现逻辑（读配置 → 默认路径）
- 理由：SKILL 之间无依赖，独立可用

### 4. 任务 ID：3 位十六进制短 ID
- 格式 `#a3f`，随机生成，确保唯一
- 理由：简短易记，跨编辑稳定标识

### 5. 情景记忆按月组织
- 路径：`memory/episodic/YYYY-MM/MMDD-描述.md`
- 月记归档：原始文件移到 `.archive/YYYY-MM/`
- 理由：避免单目录文件过多，便于按时间检索

## Risks / Trade-offs

- **SKILL 内重复 vault 路径逻辑** → 每个 SKILL 独立包含路径发现指令，有少量重复，但保证独立可用
- **索引依赖手动重建** → `memo-save` 保存后自动更新索引，但用户手动编辑文件后需运行 `/memo-index`
- **无 embedding 搜索** → 仅关键词匹配，对大量经验可能不够精确，v0.2 可扩展
