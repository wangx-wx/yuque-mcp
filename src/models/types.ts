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
  // book_id: number;
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