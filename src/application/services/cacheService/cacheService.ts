import { CacheServiceInterface, KEY, STORAGE_DATA } from './types';

export class CacheService implements CacheServiceInterface {
  private storage = localStorage;

  set<K extends KEY>(key: K, data: STORAGE_DATA[typeof key]): void {
    this.storage.setItem(key, typeof data === 'string' ? data : JSON.stringify(data));
  }

  get<K extends KEY>(key: K, parse = true): STORAGE_DATA[typeof key] | null {
    try {
      const data = this.storage.getItem(key);
      if (!data) return null;
      return parse ? JSON.parse(data) as STORAGE_DATA[typeof key] : data as STORAGE_DATA[typeof key];
    } catch (e) {
      return null;
    }
  }

  delete<K extends KEY>(key: K): void {
    return this.storage.removeItem(key);
  }
}

export const cacheService = new CacheService();
