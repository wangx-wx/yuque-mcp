/**
 * HTTP Client for Yuque API
 */

import { loadEnvConfig } from '../config/env.js';
import type { ApiError } from '../models/types.js';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
  body?: unknown;
  unwrapData?: boolean;  // 是否自动解包 data 字段
}

export class HttpClient {
  private readonly baseUrl: string;
  private readonly authToken: string;

  constructor() {
    const config = loadEnvConfig();
    this.baseUrl = "https://api.yuque.com";
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
    const { method = 'GET', params, body, unwrapData = false } = options;

    const url = this.buildUrl(endpoint, params);

    const headers: Record<string, string> = {
      'X-Auth-Token': this.authToken,
      ...options.headers,
    };

    const fetchOptions: RequestInit = {
      method,
      headers,
    };

    if (body !== undefined && (method === 'POST' || method === 'PUT')) {
      fetchOptions.body = JSON.stringify(body);
      if (!headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
      }
    }

    try {
      const response = await fetch(url, fetchOptions);

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

  /**
   * POST request
   */
  async post<T>(endpoint: string, body?: unknown, unwrapData?: boolean): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body, unwrapData });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, body: unknown, unwrapData?: boolean): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body, unwrapData });
  }
}
