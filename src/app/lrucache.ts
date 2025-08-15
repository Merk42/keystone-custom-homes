import { Injectable, InjectionToken, Inject } from '@angular/core';
export const LRU_CACHE_CAPACITY = new InjectionToken<number>(
  'lruCacheCapacity'
);
@Injectable({
  providedIn: 'root',
})
export class LruCacheService<K, V> {
  private cacheMap: Map<K, V> = new Map();
  private order: K[] = [];

  constructor(@Inject(LRU_CACHE_CAPACITY) private capacity: number) {
    if (capacity <= 0) {
      throw new Error('LRU cache capacity must be greater than 0.');
    }
  }

  get(key: K): V | undefined {
    if (!this.cacheMap.has(key)) {
      return undefined;
    }
    const value = this.cacheMap.get(key);
    this.moveToMostRecent(key);
    return value;
  }

  put(key: K, value: V): void {
    // if not present, need to check if there is room in the cache
    if (!this.cacheMap.has(key)) {
      if (this.cacheMap.size >= this.capacity) {
        // Remove least recently used
        const lruKey = this.order.shift();
        if (lruKey) {
          this.cacheMap.delete(lruKey);
        }
      }
    }
    this.cacheMap.set(key, value);
    this.moveToMostRecent(key)
  }

  keys(): K[] {
    return Array.from(this.order).reverse();
  }

  values() {
    // this will return all values, not effecting its "LRU" status. Given all are being read, the order should remain unchanged
    return this.cacheMap.values()
  }

  private moveToMostRecent(key: K) {
    // adds or moves key to the last place in order array (most recently used)
    const index = this.order.indexOf(key);
    if (index > -1) {
      this.order.splice(index, 1);
    }
    this.order.push(key);
  }
}
