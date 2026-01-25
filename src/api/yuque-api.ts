/**
 * Yuque API Client
 * Provides methods to interact with Yuque API
 */

import { HttpClient } from './client.js';
import type {
  SearchRequest,
  SearchResponse,
  GetDocRequest,
  DocumentDetail,
} from '../models/types.js';

export class YuqueApiClient {
  private readonly client: HttpClient;

  constructor() {
    this.client = new HttpClient();
  }

  /**
   * Search documents in Yuque
   * API: GET /api/v2/search
   */
  async search(request: SearchRequest): Promise<SearchResponse> {
    const params: Record<string, string | number> = {
      q: request.q,
      type: request.type,
    };

    if (request.page) params.page = request.page;
    if (request.scope) params.scope = request.scope;
    if (request.creator) params.creator = request.creator;

    return this.client.get<SearchResponse>('/api/v2/search', params);
  }

  /**
   * Get document detail
   * API: GET /api/v2/repos/docs/{doc_id}
   */
  async getDoc(request: GetDocRequest): Promise<DocumentDetail> {
    const endpoint = `/api/v2/repos/docs/${request.doc_id}`;
    return this.client.get<DocumentDetail>(endpoint, undefined, true);
  }
}
