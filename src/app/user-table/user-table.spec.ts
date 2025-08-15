import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed  } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UserTable } from './user-table';
import { LRU_CACHE_CAPACITY } from '../lrucache';

describe('UserTable Component', () => {
  let component: UserTable;
  let fixture: ComponentFixture<UserTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTable, FormsModule],
      providers: [
        provideZonelessChangeDetection(),
        { provide: LRU_CACHE_CAPACITY, useValue: 4 }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('computedDisplay()', () => {
    it('should return empty array when cache is empty', () => {
      const result = component.computedDisplay();
      expect(result).toEqual([]);
    });

    it('should return user data from cache', () => {
      component.processNewData('Bobson Dugnutt', '/api/users');

      const result = component.computedDisplay();
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Bobson Dugnutt');
      expect(result[0].endpoint).toBe('/api/users');
      expect(result[0].hits).toBe(1);
    });

    it('should sort users by hits in descending order', () => {
      // Create users with different hit counts
      component.processNewData('Bobson Dugnutt', '/api/users');
      component.processNewData('Sleve McDichael', '/api/users');
      component.processNewData('Sleve McDichael', '/api/homes');
      component.processNewData('Willie Dustice', '/api/users');
      component.processNewData('Willie Dustice', '/api/users');
      component.processNewData('Willie Dustice', '/api/homes');

      const result = component.computedDisplay();
      expect(result[0].name).toBe('Willie Dustice');
      expect(result[0].endpoint).toBe('/api/users');
    });
  });

});
