export enum KEY {
  Token = 'token',
}

export type STORAGE_DATA = {
  [KEY.Token]: string;
};

export interface CacheServiceInterface {
  set(key: KEY, data: STORAGE_DATA[KEY]): void;
  get<K extends KEY>(key: K): STORAGE_DATA[typeof key] | null;
  delete<K extends KEY>(key: K): void;
}
