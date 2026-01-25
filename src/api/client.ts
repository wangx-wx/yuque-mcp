/**
 * HTTP Client for Yuque API
 */

import { loadEnvConfig } from '../config/env.js';
import type { ApiError } from '../models/types.js';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
  unwrapData?: boolean;  // 是否自动解包 data 字段
}

export class HttpClient {
  private readonly baseUrl: string;
  private readonly authToken: string;

  constructor() {
    const config = loadEnvConfig();
    this.baseUrl = config.baseUrl;
    this.authToken = config.authToken;
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, string | number>): string {
    const url = new URL(endpoint, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    return url.toString();
  }

  /**
   * Make HTTP request with error handling
   */
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', params, unwrapData = false } = options;

    const url = this.buildUrl(endpoint, params);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Auth-Token': this.authToken,
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        method,
        headers,
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(`API request failed: ${errorData.message || response.statusText}`);
      }

      const json = await response.json();

      // 根据选项决定是否解包 data 字段
      if (unwrapData && json && typeof json === 'object' && 'data' in json) {
        return json.data as T;
      }

      return json as T;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, string | number>, unwrapData?: boolean): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params, unwrapData });
  }
}
