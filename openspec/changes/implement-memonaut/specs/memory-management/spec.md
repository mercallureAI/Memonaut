## ADDED Requirements

### Requirement: Record episodic memory
The system SHALL guide the user to describe an event and write it as an episodic memory file under `memory/episodic/YYYY-MM/MMDD-描述.md`.

#### Scenario: Record a new event
- **WHEN** user invokes `/memo-remember`
- **THEN** system asks user to describe the event, generates Markdown using the episodic memory template, and writes to `memory/episodic/YYYY-MM/MMDD-描述.md`

### Requirement: Distill semantic memory from episodic memories
The system SHALL read recent episodic memories, identify repeated patterns (≥3 occurrences), and generate or update semantic memory files under `memory/semantic/`.

#### Scenario: Distill with default range (30 days)
- **WHEN** user invokes `/memo-distill`
- **THEN** system reads episodic memories from the last 30 days, identifies patterns, and creates/updates semantic memory files

#### Scenario: Distill with custom range
- **WHEN** user invokes `/memo-distill 60` or `/memo-distill 2025-01 2025-03`
- **THEN** system reads episodic memories from the specified range and performs distillation

### Requirement: Manage mandatory rules
The system SHALL list all rules when invoked without arguments, or guide the user to add a new rule when invoked with arguments.

#### Scenario: List existing rules
- **WHEN** user invokes `/memo-rules`
- **THEN** system reads all files under `memory/rules/` and displays them

#### Scenario: Add a new rule
- **WHEN** user invokes `/memo-rules add`
- **THEN** system guides user to describe the rule and writes `memory/rules/强制规则_[领域].md`

### Requirement: Archive monthly episodic memories
The system SHALL merge the previous month's episodic memories into a monthly summary and move originals to `.archive/`.

#### Scenario: Archive last month
- **WHEN** user invokes `/memo-archive`
- **THEN** system scans `memory/episodic/YYYY-MM/` for the previous month, merges into `YYYY-MM-月记.md`, and moves original files to `memory/episodic/.archive/YYYY-MM/`
