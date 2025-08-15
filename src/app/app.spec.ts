import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { displayedProduct, product } from './types';

describe('App', () => {

  const mockExample:product = {
    id: 0,
    name: 'Electronics',
    children: [
      {
        id: 1,
        name: 'Smartphones',
        children: [
          {
            id: 2,
            name: 'Apple',
            children: [
              {
                id: 3,
                name: 'iPhone Mini',
                price: 500
              },
              {
                id: 4,
                name: 'iPhone Pro Max',
                price: 1000
              },
            ],
          },
          {
            id: 5,
            name: 'Samsung',
            children: [
              {
                id: 6,
                name: 'Galaxy S20',
                price: 900
              },
              {
                id: 7,
                name: 'Galaxy Note',
                price: 950
              },
            ]
          }
        ]
      }
    ]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  describe('Component Initialization', () => {
    it('should create the app', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });
  });

  describe('returnNode()', () => {
    it('should add maxChildPrices', () => {
        const fixture = TestBed.createComponent(App);
        const app = fixture.componentInstance;
        const EXPECTED:displayedProduct = {
        id: 0,
        name: 'Electronics',
        maxChildPrice: 1000,
        children: [
          {
            id: 1,
            name: 'Smartphones',
            maxChildPrice: 1000,
            children: [
              {
                id: 2,
                name: 'Apple',
                maxChildPrice: 1000,
                children: [
                  {
                    id: 3,
                    name: 'iPhone Mini',
                    price: 500
                  },
                  {
                    id: 4,
                    name: 'iPhone Pro Max',
                    price: 1000
                  },
                ],
              },
              {
                id: 5,
                name: 'Samsung',
                maxChildPrice: 950,
                children: [
                  {
                    id: 6,
                    name: 'Galaxy S20',
                    price: 900
                  },
                  {
                    id: 7,
                    name: 'Galaxy Note',
                    price: 950
                  },
                ]
              }
            ]
          }
        ]
      }
      expect(app.returnNode(mockExample)).toEqual(EXPECTED);
    });
  });
});
