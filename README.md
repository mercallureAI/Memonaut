# Memonaut — Personal AI Memory & Experience Management System

Memory + Astronaut. A personal agent system built on Obsidian vault + Claude Code SKILL.

## Features

- Experience knowledge base (search / save / index)
- Three-layer memory system (episodic / semantic / mandatory rules)
- Task management (add / complete / archive)
- Daily briefings & work reports (daily / weekly / monthly)
- Pure Markdown, natively readable in Obsidian

## Installation

```bash
git clone https://github.com/xxx/memonaut.git
node memonaut/scripts/memo-init.mjs [optional: vault-path]
```

Default vault path: `~/memonaut-vault`. Config is written to `~/.memonaut.json`.

## Configure Claude Code SKILL

Add the `skills/` directory to Claude Code's SKILL search path.

## Commands

| Command | Description |
|---------|-------------|
| `/memo-search <keyword>` | Search experience knowledge |
| `/memo-save` | Save a new experience |
| `/memo-index` | Rebuild experience index |
| `/memo-remember` | Record an episodic memory |
| `/memo-distill [range]` | Distill semantic memory |
| `/memo-rules [add]` | View / add mandatory rules |
| `/memo-archive` | Merge monthly memories |
| `/memo-task [add/done]` | Task management |
| `/memo-task-archive` | Archive completed tasks |
| `/memo-briefing` | Daily briefing |
| `/memo-report <type>` | Generate work report |

## License

MIT
