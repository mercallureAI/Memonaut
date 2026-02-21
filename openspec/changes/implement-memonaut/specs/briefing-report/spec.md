## ADDED Requirements

### Requirement: Generate daily briefing
The system SHALL read `tasks/todo.md`, group tasks by priority, and generate `briefings/YYYY-MM-DD-简报.md`.

#### Scenario: Generate today's briefing
- **WHEN** user invokes `/memo-briefing`
- **THEN** system reads todo.md, groups by priority, generates briefing file, and displays content

#### Scenario: Sunday maintenance reminder
- **WHEN** user invokes `/memo-briefing` on a Sunday
- **THEN** system includes a data maintenance reminder in the briefing

### Requirement: Generate work reports
The system SHALL aggregate data from tasks/archive, tasks/todo.md, memory/episodic, and experiences to generate reports.

#### Scenario: Generate daily report
- **WHEN** user invokes `/memo-report daily`
- **THEN** system scans today's data sources and generates `reports/YYYY-MM-DD-日报.md`

#### Scenario: Generate weekly report
- **WHEN** user invokes `/memo-report weekly`
- **THEN** system scans this week's data and generates `reports/YYYY-MM-DD-周报.md`

#### Scenario: Custom date range report
- **WHEN** user invokes `/memo-report 2025-06-01 2025-06-15`
- **THEN** system scans the specified date range and generates a report
