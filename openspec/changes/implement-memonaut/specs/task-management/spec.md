## ADDED Requirements

### Requirement: Add, view, and complete tasks
The system SHALL manage tasks in `tasks/todo.md` with unique 3-hex-digit IDs, organized by priority (紧急重要/重要不紧急/日常事项).

#### Scenario: View current tasks
- **WHEN** user invokes `/memo-task` without arguments
- **THEN** system reads and displays `tasks/todo.md` grouped by priority

#### Scenario: Add a new task
- **WHEN** user invokes `/memo-task add <描述>`
- **THEN** system generates a unique 3-hex ID, auto-classifies priority, appends to `tasks/todo.md`

#### Scenario: Complete a task
- **WHEN** user invokes `/memo-task done #a3f`
- **THEN** system marks the matching task as `[x]` in `tasks/todo.md`

### Requirement: Archive completed tasks
The system SHALL move completed tasks from `tasks/todo.md` to `tasks/archive/YYYY-MM-归档.md`.

#### Scenario: Archive completed tasks
- **WHEN** user invokes `/memo-task-archive`
- **THEN** system finds all `[x]` tasks in `todo.md`, appends them to the current month's archive file, and removes them from `todo.md`
