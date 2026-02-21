## ADDED Requirements

### Requirement: Search experiences by keyword
The system SHALL search the experience knowledge base by reading `.memonaut/index.md`, matching keywords against titles and tags, then reading and returning matched file contents.

#### Scenario: Keyword matches existing experience
- **WHEN** user invokes `/memo-search Docker 超时`
- **THEN** system reads index, finds entries matching "Docker" or "超时", reads those files, and returns their content

#### Scenario: No matches found
- **WHEN** user invokes `/memo-search` with a keyword that matches nothing
- **THEN** system informs user no matching experiences were found

### Requirement: Save new experience
The system SHALL interactively guide the user to create a new experience entry, auto-classify it into pitfalls/standards/solutions, write the Markdown file, and update the index.

#### Scenario: Save a pitfall experience
- **WHEN** user invokes `/memo-save` and describes a problem they encountered
- **THEN** system generates a Markdown file using the experience template, classifies it under `experiences/pitfalls/`, asks user to confirm, writes the file, and updates `.memonaut/index.md`

### Requirement: Rebuild experience index
The system SHALL rebuild the experience index by invoking the `memo-index.mjs` script.

#### Scenario: Rebuild after manual edits
- **WHEN** user invokes `/memo-index`
- **THEN** system runs `memo-index.mjs` and regenerates `.memonaut/index.md` from all files under `experiences/`
