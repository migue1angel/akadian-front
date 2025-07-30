export interface ServerResponse {
  data: any;
  pagination?: PaginatorModel;
  error?: string;
  message: string;
  status?: number;
}

export interface PaginatorModel {
  page: number;
  firstItem: number;
  lastPage: number;
  limit: number;
  lastItem: number;
  totalItems: number;
}
