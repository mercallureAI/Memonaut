# /memo-archive — 月记合并

## 触发词
`/memo-archive`

## 核心流程

1. **定位 vault**：读取 `~/.memonaut.json` 获取 `vaultPath`
2. **确定上月**：计算上个月的 YYYY-MM
3. **扫描上月记忆**：读取 `memory/episodic/YYYY-MM/` 下所有 `.md` 文件
4. **合并为月记**：将所有情景记忆合并为 `memory/episodic/YYYY-MM-月记.md`
5. **归档原始文件**：将原始文件移动到 `memory/episodic/.archive/YYYY-MM/`（不删除）
6. **展示结果**：告知用户合并了多少条记忆

## 月记模板

```markdown
# YYYY-MM 月记

- **合并日期**: YYYY-MM-DD
- **记忆数量**: N 条

## 事件汇总

### MMDD 事件标题
[原始内容摘要]

...
```
