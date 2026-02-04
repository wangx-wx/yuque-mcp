## ADDED Requirements

### Requirement: Update document content
The system SHALL provide an MCP tool `update_doc` that allows updating an existing Yuque document's content, title, slug, format, and visibility.

#### Scenario: Successfully update document title and content
- **WHEN** the user calls `update_doc` with `doc_id`, `title`, and `content` parameters
- **THEN** the system SHALL call Yuque API `PUT /api/v2/repos/{group_login}/{book_slug}/docs/{doc_id}` with the provided fields
- **AND** return the updated document details including new title and content

#### Scenario: Update only document content
- **WHEN** the user calls `update_doc` with only `doc_id` and `content` parameters
- **THEN** the system SHALL call the API with only the content field
- **AND** the document's title and other attributes SHALL remain unchanged

#### Scenario: Update document slug
- **WHEN** the user calls `update_doc` with `doc_id` and `slug` parameters
- **THEN** the system SHALL update the document's URL path
- **AND** return the updated document with the new slug

#### Scenario: Update document visibility
- **WHEN** the user calls `update_doc` with `doc_id` and `public` parameters (0=private, 1=public, 2=organization)
- **THEN** the system SHALL update the document's visibility setting
- **AND** return the updated document with the new visibility

#### Scenario: Document not found
- **WHEN** the user calls `update_doc` with a `doc_id` that does not exist
- **THEN** the system SHALL return an error with message indicating the document was not found
- **AND** the error SHALL include the HTTP 404 status information

#### Scenario: API authentication failure
- **WHEN** the user calls `update_doc` but the API token is invalid or expired
- **THEN** the system SHALL return an error with authentication failure message
- **AND** the error SHALL include the HTTP 401 status information

#### Scenario: No permission to update document
- **WHEN** the user calls `update_doc` for a document they don't have write access to
- **THEN** the system SHALL return an error indicating insufficient permissions
- **AND** the error SHALL include the HTTP 403 status information

### Requirement: Document format support
The system SHALL support updating documents in markdown format (default) and allow specifying alternative formats (html, lake).

#### Scenario: Update document with markdown format
- **WHEN** the user calls `update_doc` with `format` set to "markdown"
- **THEN** the system SHALL send the content to API with format="markdown"
- **AND** the document SHALL be rendered as markdown in Yuque

#### Scenario: Update document without specifying format
- **WHEN** the user calls `update_doc` without providing the `format` parameter
- **THEN** the system SHALL default to "markdown" format
- **AND** process the content as markdown

### Requirement: Tool schema definition
The system SHALL define a Zod schema for the `update_doc` tool with appropriate validation and descriptions for all parameters.

#### Scenario: Validate required doc_id parameter
- **WHEN** the tool schema is registered with MCP server
- **THEN** `doc_id` SHALL be defined as a required string parameter
- **AND** it SHALL have a description explaining it can be document ID or slug

#### Scenario: Validate optional parameters
- **WHEN** the tool schema is registered
- **THEN** `title`, `content`, `slug`, `public`, and `format` SHALL be optional parameters
- **AND** each SHALL have appropriate type validation and description
