import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LruCacheService, LRU_CACHE_CAPACITY } from './lrucache';

describe('LruCacheService', () => {
  let service: LruCacheService<string, number>;
  const DEFAULT_CAPACITY = 3;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        LruCacheService,
        { provide: LRU_CACHE_CAPACITY, useValue: DEFAULT_CAPACITY }
      ]
    });
    service = TestBed.inject(LruCacheService);
  });

  describe('Constructor', () => {
    it('should create service', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('get()', () => {
    it('should return undefined if key is not present', () => {
      const UNDEF = service.get('fakekey');
      expect(UNDEF).toBeUndefined()
    })

    it('should get value if key is present', () => {
      service.put('key', 1);
      const VALUE = service.get('key');
      expect(VALUE).toBe(1)
    })

    it('should change order', () => {
      service.put('key1', 1);
      service.put('key2', 2);
      service.put('key3', 3);
      service.get('key2')
      expect(service.keys()).toEqual(['key2', 'key3', 'key1'])
    })
  });

  describe('put()', () => {
    it('should update value if key is updated', () => {
      service.put('key', 1);
      service.put('key', 2);
      const VALUE = service.get('key');
      expect(VALUE).toBe(2)
    })

    it('should make room for new data by removing least recently used', () => {
      service.put('key1', 1);
      service.put('key2', 2);
      service.put('key3', 3);
      service.put('key4', 4);

      expect(service.get('key1')).toBeUndefined;
      expect(service.get('key2')).toBe(2);
      expect(service.get('key3')).toBe(3);
      expect(service.get('key4')).toBe(4);
    })
  });

  describe('keys()', () => {
    it('should return keys in reverse order', () => {
      service.put('key1', 1);
      service.put('key2', 2);
      service.put('key3', 3);
      const keys = service.keys();

      expect(keys).toEqual(['key3', 'key2', 'key1']);
    });

    it('should update order after access', () => {
      service.put('key1', 1);
      service.put('key2', 2);
      service.put('key3', 3);
      service.get('key1');

      const keys = service.keys();
      expect(keys).toEqual(['key1', 'key3', 'key2']);
    });
  })

  describe('values()', () => {
    it('should return all values with order unchanged', () => {
      service.put('key1', 1);
      service.put('key2', 2);
      service.put('key3', 3);
      const keysBefore = [...service.keys()];
      const values = service.values();
      const keysAfter = [...service.keys()];
      const expected = new Map([["key1", 1], ["key2", 2], ["key3", 3]]).values()
      expect(values).toEqual(expected);
      expect(keysBefore).toEqual(keysAfter)
    });
  });
});
