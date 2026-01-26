/**
 * Yuque API Client
 * Provides methods to interact with Yuque API
 */

import { loadEnvConfig } from '../config/env.js';
import type {
  CreateDocRequest,
  CreateDocResponse,
  DocumentDetail,
  GetDocRequest,
  SearchRequest,
  SearchResponse,
  TocResponse,
  UpdateTocRequest,
  UpdateTocResponse,
} from '../models/types.js';
import { HttpClient } from './client.js';

export class YuqueApiClient {
  private readonly client: HttpClient;
  private readonly config = loadEnvConfig();
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
   * API: GET /api/v2/repos/:group_login/:book_slug/docs/:id
   */
  async getDoc(request: GetDocRequest): Promise<DocumentDetail> {
    const endpoint = `/api/v2/repos/${this.config.groupLogin}/${this.config.bookSlug}/docs/${request.doc_id}`;
    return this.client.get<DocumentDetail>(endpoint, undefined, true);
  }

  /**
   * Get table of contents
   * API: GET /api/v2/repos/:group_login/:book_slug/toc
   */
  async getToc(): Promise<TocResponse> {
    const endpoint = `/api/v2/repos/${this.config.groupLogin}/${this.config.bookSlug}/toc`;
    return this.client.get<TocResponse>(endpoint);
  }

  /**
   * Create document
   * API: POST /api/v2/repos/:group_login/:book_slug/docs
   */
  async createDoc(request: CreateDocRequest): Promise<CreateDocResponse> {
    const endpoint = `/api/v2/repos/${this.config.groupLogin}/${this.config.bookSlug}/docs`;
    return this.client.post<CreateDocResponse>(endpoint, request, true);
  }

  /**
   * Update table of contents
   * API: PUT /api/v2/repos/:group_login/:book_slug/toc
   */
  async updateToc(request: UpdateTocRequest): Promise<UpdateTocResponse> {
    const endpoint = `/api/v2/repos/${this.config.groupLogin}/${this.config.bookSlug}/toc`;
    return this.client.put<UpdateTocResponse>(endpoint, request, true);
  }
}
