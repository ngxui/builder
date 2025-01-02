export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH' | 'TRACE';

export interface DataLoaderConfig {
  isLazyLoadEnabled: boolean;
  dataUrl?: string;
  requestMethod?: HttpMethod; // DEFAULT GET
  header?: any;
  nestedField?: string;
}
