export interface APIServiceType {
  get: (params?: any) => any;
  post: (params: any) => any;
  delete: (params: any) => any;
}