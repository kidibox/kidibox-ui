declare module 'isomorphic-fetch' {}

export type FetchOptions = {
  headers?: Object,
  method?: string,
  body?: string|FormData
};

declare function fetch(path: string, options?: FetchOptions): Promise;
