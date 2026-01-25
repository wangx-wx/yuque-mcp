/**
 * MCP Tool Response Entities
 * 工具返回给用户的响应实体
 */

import { format } from 'path';
import type { SearchResponse, DocumentDetail, SearchResult } from './types.js';

/**
 * 搜索结果项 - 简化版
 */
export interface SearchResultItem {
  doc_id: number;
  book_id: number;
  title: string;
  summary: string;
}

/**
 * 搜索工具响应
 */
export interface SearchToolResponse {
  results: SearchResultItem[];
  total: number;
  page: number;
}

/**
 * 文档详情工具响应 - 简化版
 */
export interface DocDetailToolResponse {
  doc_id: number;
  book_id: number;
  title: string;
  body: string;
  slug: string;
  format: string;
  created_at: string;
  updated_at: string;
}

/**
 * 转换器 - 将 API 响应转换为工具响应
 */
export class ResponseTransformer {

  /**
   * 转换单个搜索结果
   */
  private static transformSearchItem(data: SearchResult): SearchResultItem {

    return {
      doc_id: data.target.id,
      book_id: data.target.book_id,
      title: data.title,
      summary: data.summary || '',
    };
  }

  /**
   * 转换搜索响应
   */
  static transformSearch(response: SearchResponse): SearchToolResponse {
    return {
      results: response.data.map(item => this.transformSearchItem(item)),
      total: response.total,
      page: response.page_no,
    };
  }

  /**
   * 转换文档详情响应
   */
  static transformDocDetail(detail: DocumentDetail): DocDetailToolResponse {
    return {
      doc_id: detail.id,
      book_id: detail.book_id,
      title: detail.title,
      body: detail.body,
      slug: detail.slug,
      format: detail.format,
      created_at: detail.created_at,
      updated_at: detail.updated_at,
    };
  }
}
