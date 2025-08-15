import { CurrencyPipe } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductTree } from './product-tree';
import { displayedProduct } from '../types';

// Test data
const mockData: displayedProduct = {
  "id": 0,
  "name": "Electronics",
  "children": [
    {
      "id": 1,
      "name": "Smartphones",
      "children": [
        {
          "id": 2,
          "name": "Apple",
          "children": [
            {
              "id": 3,
              "name": "iPhone Mini",
              "price": 500
            },
            {
              "id": 4,
              "name": "iPhone Pro Max",
              "price": 1000
            }
          ],
          "maxChildPrice": 1000
        },
        {
          "id": 5,
          "name": "Samsung",
          "children": [
            {
              "id": 6,
              "name": "Galaxy S20",
              "price": 900
            },
            {
              "id": 7,
              "name": "Galaxy Note",
              "price": 950
            }
          ],
          "maxChildPrice": 950
        }
      ],
      "maxChildPrice": 1000
    }
  ],
  "maxChildPrice": 1000
};

const onlyProduct: displayedProduct = {
  "id": 3,
  "name": "iPhone Mini",
  "price": 500
};


describe('ProductTree Component', () => {
  let component: ProductTree;
  let fixture: ComponentFixture<ProductTree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTree, CurrencyPipe],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTree);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      fixture.componentRef.setInput('data', mockData);
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should initialize with default value', () => {
      expect(component.parents()).toEqual([]);
    });
  });

  describe('Computed Properties', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('data', mockData);
      fixture.detectChanges();
    });

    describe('path()', () => {
      it('should combine parents and current name', () => {
        fixture.componentRef.setInput('parents', ['Alpha', 'Beta']);
        fixture.detectChanges();
        expect(component.path()).toEqual(['Alpha', 'Beta', 'Electronics']);
      });

      it('should work with empty parents', () => {
        expect(component.path()).toEqual(['Electronics']);
      });
    });

    describe('id()', () => {
      it('should create prefixed id from id property', () => {
        expect(component.id()).toBe('id-0');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle product with no children property', () => {
      expect(() => {
        fixture.componentRef.setInput('data', onlyProduct);
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should handle product with empty children array', () => {
      const productWithEmptyChildren = {
        id: 1,
        name: 'Test Product',
        children: [],
        maxChildPrice: 0
      };

      fixture.componentRef.setInput('data', productWithEmptyChildren);
      fixture.detectChanges();

      const headingElement = fixture.debugElement.query(By.css('.heading'));
      expect(headingElement).toBeTruthy();
    });
  });
});
