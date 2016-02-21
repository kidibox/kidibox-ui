declare module 'isomorphic-fetch' {}

type FetchOptions = {
  headers?: Object,
  method?: string,
  body?: string
};

declare function fetch(path: string, options?: FetchOptions): Promise;
