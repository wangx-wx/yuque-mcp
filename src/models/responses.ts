/**
 * MCP Tool Response Entities
 * 工具返回给用户的响应实体
 */

import { format } from 'path';
import type { SearchResponse, DocumentDetail, SearchResult, V2TocItem, CreateDocResponse } from './types.js';
import {loadEnvConfig} from '../config/env.js';
/**
 * 搜索结果项 - 简化版
 */
export interface SearchResultItem {
  doc_id: number;
  title: string;
  summary: string;
}

/**
 * 搜索工具响应
 */
export interface SearchToolResponse {
  results: SearchResultItem[];
}

/**
 * 文档详情工具响应 - 简化版
 */
export interface DocDetailToolResponse {
  doc_id: number;
  title: string;
  body: string;
  slug: string;
  format: string;
  url: string;
  created_at: string;
  updated_at: string;
}

/**
 * TOC 项 - 简化版
 */
export interface TocItem {
  uuid: string;
  title: string;
}

/**
 * TOC 工具响应
 */
export interface TocToolResponse {
  items: TocItem[];
}

/**
 * 创建文档工具响应
 */
export interface CreateDocToolResponse {
  doc_id: number;
  title: string;
  url: string
}

/**
 * 更新文档工具响应
 */
export interface UpdateDocToolResponse {
  doc_id: number;
  title: string;
  url: string;
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
    };
  }

  /**
   * 转换文档详情响应
   */
  static transformDocDetail(detail: DocumentDetail): DocDetailToolResponse {
    const config = loadEnvConfig();
    return {
      doc_id: detail.id,
      title: detail.title,
      url: `${config.baseUrl}/${config.groupLogin}/${config.bookSlug}/${detail.slug}`,
      body: detail.body,
      slug: detail.slug,
      format: detail.format,
      created_at: detail.created_at,
      updated_at: detail.updated_at,
    };
  }

  /**
   * 转换 TOC 响应
   */
  static transformToc(data: V2TocItem[]): TocToolResponse {
    return {
      items: data.map(item => ({
        uuid: item.uuid,
        title: item.title,
      })),
    };
  }

  /**
   * 转换创建文档响应
   */
  static transformCreateDoc(createResponse: CreateDocResponse, title: string, tocItem: V2TocItem): CreateDocToolResponse {
    const config = loadEnvConfig();
    return {
      doc_id: createResponse.id,
      title: title,
      url: `${config.baseUrl}/${config.groupLogin}/${config.bookSlug}/${createResponse.slug}`,
    };
  }

  /**
   * 转换更新文档响应
   */
  static transformUpdateDoc(updateResponse: DocumentDetail): UpdateDocToolResponse {
    const config = loadEnvConfig();
    return {
      doc_id: updateResponse.id,
      title: updateResponse.title,
      url: `${config.baseUrl}/${config.groupLogin}/${config.bookSlug}/${updateResponse.slug}`,
    };
  }
}
