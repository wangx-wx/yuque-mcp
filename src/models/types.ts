/**
 * TypeScript type definitions for Yuque API
 */

// ============ Search Types ============

export interface SearchRequest {
  q: string;
  type: 'doc' | 'repo';
  page?: number;
  scope?: string;
  creator?: string;
}

export interface SearchResult {
  id: number;
  type: string;
  title: string;
  summary: string;
  url: string;
  info?: string;
  target: V2Doc;
}

export interface SearchResponse {
  data: SearchResult[];
  total: number;
  page_no: number;
  page_size: number;
}

// ============ Document Types ============

export interface UserInfo {
  id: number;
  name: string;
  login: string;
}

export interface BookInfo {
  id: number;
  name: string;
  slug: string;
}

export interface DocumentDetail {
  id: number;
  type: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  format: string;
  public: number;
  book_id: number;
  status: string;
  book: BookInfo;
  user: UserInfo;
  created_at: string;
  updated_at: string;
  word_count: number;
  read_count: number;
}

export interface GetDocRequest {
  doc_id: number;
}

// ============ API Response Types ============

export interface ApiResponse<T> {
  data: T;
}

export interface ApiError {
  message: string;
  code?: number;
}

export interface V2Doc {
  id: number;
  slug: string;
  title: string;
  description: string;
  book_id: number;
}

// ============ TOC Types ============

export interface V2TocItem {
  uuid: string;
  type: 'DOC' | 'LINK' | 'TITLE';
  title: string;
  url?: string;
  slug?: string;
  id?: number;
  doc_id?: number;
  level?: number;
  depth?: number;
  open_window?: 0 | 1;
  visible?: 0 | 1;
  prev_uuid?: string;
  sibling_uuid?: string;
  child_uuid?: string;
  parent_uuid?: string;
}

export interface TocResponse {
  data: V2TocItem[];
}

// ============ Create Doc Types ============

export interface CreateDocRequest {
  slug?: string;
  title: string;
  public?: number;
  format?: 'markdown' | 'lake' | 'html';
  body?: string;
}

export type CreateDocResponse = DocumentDetail;

export interface UpdateTocRequest {
  action: 'appendNode' | 'prependNode' | 'editNode' | 'removeNode';
  action_mode?: 'sibling' | 'child';
  target_uuid?: string;
  node_uuid?: string;
  doc_ids?: number[];
  type?: 'DOC' | 'LINK' | 'TITLE';
  title?: string;
  url?: string;
  open_window?: number;
  visible?: 0 | 1;
}

export type UpdateTocResponse = V2TocItem;

// ============ Update Doc Types ============

export interface UpdateDocRequest {
  doc_id: string;
  slug?: string;
  title?: string;
  public: 0 | 1 | 2;
  format: 'markdown' | 'lake' | 'html';
  body?: string;
}

export type UpdateDocResponse = DocumentDetail;