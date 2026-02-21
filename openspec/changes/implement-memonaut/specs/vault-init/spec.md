## ADDED Requirements

### Requirement: Initialize vault with complete directory structure
The system SHALL create a complete Obsidian vault with all required directories (experiences/pitfalls, experiences/standards, experiences/solutions, memory/episodic, memory/episodic/.archive, memory/semantic, memory/rules, tasks, tasks/archive, briefings, reports, .memonaut) and template files (README.md, config.md, index.md, todo.md).

#### Scenario: First-time initialization with default path
- **WHEN** user runs `node memo-init.mjs` without arguments
- **THEN** system creates vault at `~/memonaut-vault` with all directories and template files, and writes `~/.memonaut.json` with the vault path

#### Scenario: Custom path initialization
- **WHEN** user runs `node memo-init.mjs /custom/path`
- **THEN** system creates vault at `/custom/path` with all directories and template files, and writes `~/.memonaut.json` with `{"vaultPath": "/custom/path"}`

#### Scenario: Vault already exists
- **WHEN** user runs `memo-init.mjs` and the vault directory already exists
- **THEN** system SHALL skip existing files/directories without overwriting, only create missing ones, and inform the user

### Requirement: Index generation script
The system SHALL provide `memo-index.mjs` that scans all Markdown files under `experiences/` and generates `.memonaut/index.md` containing each entry's title, tags, and relative path.

#### Scenario: Generate index from experiences
- **WHEN** user runs `node memo-index.mjs`
- **THEN** system reads `~/.memonaut.json` to locate vault, scans `experiences/**/*.md`, extracts title and tags from each file, and writes `.memonaut/index.md`
