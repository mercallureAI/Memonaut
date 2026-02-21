# Memonaut — 个人 AI 记忆与经验管理系统 PRD

## Context

TeamDNA 解决了团队经验协同的问题，但个人场景有不同的需求：经验散落在各处、踩过的坑记不住、任务管理混乱、每天的工作缺乏回顾。

Memonaut（Memory + Astronaut，记忆航行者）是 TeamDNA 的个人本地版，基于 Obsidian vault + Claude Code SKILL，将个人的经验知识、记忆体系、任务管理、每日简报、工作报告整合为一个完整的个人 Agent 系统。

**核心差异（vs TeamDNA）：**
- 单人使用，无 Git 同步，纯本地文件
- Obsidian vault 即数据库，用户可直接在 Obsidian 中浏览和编辑
- 融合三层记忆体系（情景/语义/强制规则）
- 包含任务管理、晨间简报和工作报告能力

**目标**：开源项目，MIT License，最简实现（SKILL + 脚本），Obsidian 用户友好。

---

## 1. 整体架构

两层设计：

1. **存储层** — 一个独立的 Obsidian vault，按功能模块组织目录
2. **交互层** — Claude Code SKILL 命令（经验管理 + 记忆管理 + 任务管理 + 简报 + 工作报告）

不需要数据库、不需要后端服务、不需要 Git 同步。Obsidian vault 是唯一存储，SKILL 是唯一交互入口。

### Vault 路径发现机制

SKILL 可能在任意工作目录下被调用，需要可靠地定位 vault 路径：

1. **配置文件**：检查 `~/.memonaut.json`，读取 `vaultPath` 字段
2. **默认路径**：若无配置文件，使用默认路径 `~/memonaut-vault`
3. **初始化写入**：`memo-init` 脚本创建 vault 时，同时写入 `~/.memonaut.json`

```json
// ~/.memonaut.json
{
  "vaultPath": "/Users/xxx/memonaut-vault"
}
```

---

## 2. Vault 目录结构

```
memonaut-vault/                  # 独立 Obsidian vault
├── README.md
├── .memonaut/
│   ├── config.md                # 配置（vault 路径等）
│   └── index.md                 # 自动生成的经验索引
│
├── experiences/                 # 经验知识库（继承自 TeamDNA）
│   ├── pitfalls/                # 踩坑记录
│   ├── standards/               # 个人规范
│   └── solutions/               # 方案沉淀
│
├── memory/                      # 三层记忆体系
│   ├── episodic/                # 情景记忆（具体事件，按月子目录）
│   │   ├── YYYY-MM/             # 按月组织
│   │   │   └── MMDD-简短描述.md
│   │   └── .archive/            # 月记合并后的原始文件归档
│   │       └── YYYY-MM/
│   ├── semantic/                # 语义记忆（提炼的知识和模式）
│   │   └── [主题]_[类型].md
│   └── rules/                   # 强制规则（系统行为约束）
│       └── 强制规则_[领域].md
│
├── tasks/                       # 任务管理
│   ├── todo.md                  # 当前任务清单
│   └── archive/                 # 已完成任务归档
│       └── YYYY-MM-归档.md
│
├── briefings/                   # 简报
│   └── YYYY-MM-DD-简报.md
│
└── reports/                     # 工作报告
    └── YYYY-MM-DD-[类型]报告.md
```

设计要点：
- 五大模块各占一个顶层目录，职责清晰
- experiences/ 继承 TeamDNA 的三分类结构
- memory/ 实现三层记忆架构
- reports/ 存放生成的日报/周报/月报
- 所有文件纯 Markdown，Obsidian 原生可读
- .memonaut/ 存放系统配置和索引，对用户透明

---

## 3. 三层记忆体系

### 情景记忆（episodic/）
- 具体事件和对话记录
- 按月子目录组织：`episodic/YYYY-MM/MMDD-简短描述.md`
- 示例：`episodic/2025-06/0615-Docker部署问题.md`
- 月记合并：月初将上月情景记忆合并为 `YYYY-MM-月记.md`，原始文件移到 `episodic/.archive/YYYY-MM/`
- 内容：时间、事件、上下文、结果

### 语义记忆（semantic/）
- 从情景记忆中提炼的知识和模式
- 命名：`[主题]_[类型].md`（如 `Docker_部署模式.md`）
- 提炼时机：发现重复模式（≥3次）、完成重大项目后
- 内容：模式描述、适用场景、关键步骤

### 强制规则（rules/）
- 系统行为约束，必须遵守的规则
- 命名：`强制规则_[领域].md`（如 `强制规则_代码风格.md`）
- 来源：从语义记忆中发现的必须遵守的规则
- 内容：规则描述、触发条件、执行方式

### 记忆提炼流程
```
情景记忆 → 识别模式（≥3次重复）→ 语义记忆
语义记忆 → 发现必须遵守的规则 → 强制规则
```

---

## 4. Markdown 模板

### 经验条目模板（experiences/）

```markdown
# [标题]

- **日期**: YYYY-MM-DD
- **标签**: 关键词1, 关键词2
- **场景**: 简述适用场景

## 问题/背景
## 解决方案
## 注意事项
```

### 情景记忆模板（memory/episodic/）

```markdown
# MMDD 简短描述

- **日期**: YYYY-MM-DD
- **标签**: 关键词

## 事件
## 上下文
## 结果/收获
```

### 任务清单格式（tasks/todo.md）

每个任务带唯一短ID（3位十六进制），确保跨编辑稳定标识：

```markdown
# 任务清单

## 紧急重要
- [ ] #a3f 任务描述 | 标签: xxx | 创建: YYYY-MM-DD

## 重要不紧急
- [ ] #b7c 任务描述 | 标签: xxx | 创建: YYYY-MM-DD

## 日常事项
- [ ] #d2e 任务描述 | 标签: xxx | 创建: YYYY-MM-DD
```

### 工作报告模板（reports/）

```markdown
# [日报/周报/月报] YYYY-MM-DD

- **周期**: YYYY-MM-DD ~ YYYY-MM-DD
- **生成时间**: YYYY-MM-DD HH:MM

## 完成事项
- 事项1（来源：任务归档/情景记忆）
- 事项2

## 进行中
- 事项（当前状态、进度）

## 关键收获
- 从情景记忆和经验条目中提炼

## 下一步计划
- 从待办任务中提取
```

所有模板纯 Markdown，无 frontmatter，Obsidian 原生可读。

---

## 5. SKILL 命令体系

### 经验管理（继承 TeamDNA，去掉 Git 同步）

| 命令 | 说明 |
|------|------|
| `/memo-search <关键词>` | 搜索个人经验知识 |
| `/memo-save` | 保存新经验到知识库 |
| `/memo-index` | 重建经验索引 |

**`/memo-search`**：读 index.md → 关键词匹配 → 读目标文件 → 返回结果
**`/memo-save`**：交互引导 → 生成 MD → AI 自动分类到 pitfalls/standards/solutions（支持子目录如 `pitfalls/docker/`）→ 用户确认 → 写入文件 → 更新索引
**`/memo-index`**：调用 `scripts/memo-index.mjs` 脚本 → 扫描 experiences/ 所有 MD → 提取标题/标签/路径 → 生成 index.md

### 记忆管理

| 命令 | 说明 |
|------|------|
| `/memo-remember` | 记录一条情景记忆 |
| `/memo-distill` | 从情景记忆提炼语义记忆 |
| `/memo-rules` | 查看/添加强制规则 |
| `/memo-archive` | 月记合并（将上月情景记忆合并为月记） |

**`/memo-remember`**：引导描述事件 → 生成情景记忆 MD → 写入 episodic/YYYY-MM/ 子目录
**`/memo-distill`**：读取近期情景记忆（默认最近30天，可传参指定范围如 `/memo-distill 60` 或 `/memo-distill 2025-01 2025-03`）→ 识别重复模式 → 生成/更新语义记忆
**`/memo-rules`**：无参数时列出所有规则；有参数时引导添加新规则
**`/memo-archive`**：扫描上月情景记忆 → 合并为月记 → 将原始文件移到 `episodic/.archive/YYYY-MM/`（不删除）

### 任务管理

| 命令 | 说明 |
|------|------|
| `/memo-task` | 添加/查看/完成任务 |
| `/memo-task-archive` | 归档已完成任务 |

**`/memo-task`**：
- 无参数：显示当前任务清单
- `/memo-task add <描述>`：添加任务，自动分类紧急程度
- `/memo-task done <ID>`：标记任务完成（如 `/memo-task done #a3f`）

**`/memo-task-archive`**：将 todo.md 中已完成任务转移到 archive/YYYY-MM-归档.md

### 简报系统

| 命令 | 说明 |
|------|------|
| `/memo-briefing` | 生成/显示今日简报 |

**`/memo-briefing`**：
- 读取 tasks/todo.md 未完成任务
- 按优先级分组展示
- 生成 briefings/YYYY-MM-DD-简报.md
- 周日额外提醒数据维护

### 工作报告

| 命令 | 说明 |
|------|------|
| `/memo-report <类型> [起始日期] [结束日期]` | 生成工作报告 |

**`/memo-report`**：
- 类型：`daily`（日报）、`weekly`（周报）、`monthly`（月报），或自定义日期范围
- 日期参数可选，默认根据类型自动推算（日报=今天，周报=本周，月报=本月）
- 自定义范围示例：`/memo-report 2025-06-01 2025-06-15`

**数据来源**：
1. **tasks/archive/** — 指定日期范围内已完成的任务
2. **tasks/todo.md** — 当前进行中的任务
3. **memory/episodic/** — 指定日期范围内的情景记忆
4. **experiences/** — 指定日期范围内新增的经验条目

**生成流程**：
1. 解析日期范围
2. 扫描上述四个数据源，按日期过滤
3. 汇总为：完成事项、进行中、关键收获、下一步计划
4. 生成 reports/YYYY-MM-DD-[类型]报告.md
5. 展示报告内容，用户可直接复制用于周报/月报

---

## 6. 典型用户工作流

**场景 A：开发中遇到问题**
```
用户：/memo-search Docker 容器启动超时
Agent：读索引 → 匹配 experiences/pitfalls/docker/... → 返回内容
```

**场景 B：解决问题后记录经验**
```
用户：/memo-save
Agent：引导填写 → 生成 MD → 确认 → 写入 experiences/ → 更新索引
```

**场景 C：每日开始工作**
```
用户：/memo-briefing
Agent：读任务清单 → 按优先级展示 → 生成今日简报
```

**场景 D：会话结束记录收获**
```
用户：/memo-remember
Agent：引导描述事件 → 写入 memory/episodic/
```

**场景 E：月度回顾提炼**
```
用户：/memo-distill
Agent：读近期情景记忆 → 识别模式 → 生成语义记忆
```

**场景 F：写周报**
```
用户：/memo-report weekly
Agent：扫描本周任务归档+情景记忆+新增经验 → 生成周报 → 用户复制提交
```

**场景 G：自定义日期范围报告**
```
用户：/memo-report 2025-06-01 2025-06-15
Agent：扫描指定范围数据 → 生成报告
```

---

## 7. 技术实现 — 交付物清单

```
memonaut/                        # 开源工具仓库
├── skills/
│   ├── memo-search.md           # 搜索经验
│   ├── memo-save.md             # 保存经验
│   ├── memo-index.md            # 重建索引
│   ├── memo-remember.md         # 记录情景记忆
│   ├── memo-distill.md          # 提炼语义记忆
│   ├── memo-rules.md            # 管理强制规则
│   ├── memo-archive.md          # 月记合并
│   ├── memo-task.md             # 任务管理
│   ├── memo-task-archive.md     # 任务归档
│   ├── memo-briefing.md         # 每日简报
│   └── memo-report.md           # 工作报告
├── scripts/
│   ├── memo-init.mjs            # 初始化（跨平台 Node.js）
│   └── memo-index.mjs           # 索引生成（跨平台 Node.js）
├── template/                    # vault 模板
│   ├── README.md
│   ├── .memonaut/
│   │   ├── config.md
│   │   └── index.md
│   ├── experiences/
│   │   ├── pitfalls/.gitkeep
│   │   ├── standards/.gitkeep
│   │   └── solutions/.gitkeep
│   ├── memory/
│   │   ├── episodic/
│   │   │   └── .archive/.gitkeep
│   │   ├── semantic/.gitkeep
│   │   └── rules/.gitkeep
│   ├── tasks/
│   │   ├── todo.md
│   │   └── archive/.gitkeep
│   ├── briefings/.gitkeep
│   └── reports/.gitkeep
└── README.md
```

安装流程：
```bash
git clone https://github.com/xxx/memonaut.git
node memonaut/scripts/memo-init.mjs [可选: vault路径]
```

---

## 8. MVP 范围（v0.1）

**包含：**
- 11 个 SKILL 文件
- 2 个 Node.js 跨平台脚本（init + index）
- 1 套 vault 模板
- README 文档

**不包含：**
- Obsidian 插件（深度集成）
- Web UI
- 语义搜索（embedding）
- 自动触发（Hooks 集成）
- 多设备同步（用户自行用 Obsidian Sync 或 Git）

---

## 9. 后续扩展方向（v0.2+）

- Claude Code Hooks 集成（会话开始自动简报、结束提醒记录）
- Obsidian 深度集成（dataview 查询、canvas 可视化、MOC 链接）
- 索引增强（可选接入 embedding 语义搜索）
- 与 TeamDNA 互通（个人经验一键推送到团队仓库）

---

## 10. 实现步骤

1. 创建 vault 模板（template/ 目录）
2. 编写 `memo-index.mjs` 索引生成脚本（Node.js 跨平台）
3. 编写 `memo-init.mjs` 初始化脚本（Node.js 跨平台，同时写入 ~/.memonaut.json）
4. 编写经验管理 SKILL（memo-search、memo-save、memo-index）
5. 编写记忆管理 SKILL（memo-remember、memo-distill、memo-rules、memo-archive）
6. 编写任务管理 SKILL（memo-task、memo-task-archive）
7. 编写简报 SKILL（memo-briefing）
8. 编写工作报告 SKILL（memo-report）
9. 编写 README.md
10. 本地测试完整流程

---

## 11. 验证方式

1. 运行 `node memo-init.mjs` 创建测试 vault，验证目录结构正确且 `~/.memonaut.json` 已生成
2. 使用 `/memo-save` 保存一条测试经验，验证文件生成
3. 使用 `/memo-search` 搜索刚保存的经验，验证能找到
4. 使用 `/memo-remember` 记录一条情景记忆
5. 使用 `/memo-task add` 添加任务，验证 todo.md 更新
6. 使用 `/memo-briefing` 生成简报，验证内容正确
7. 使用 `/memo-report weekly` 生成周报，验证数据来源和格式
8. 在 Obsidian 中打开 vault，验证所有文件可正常浏览
