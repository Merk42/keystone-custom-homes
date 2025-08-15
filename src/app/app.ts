import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductTree } from './product-tree/product-tree';
import { displayedProduct, product } from './types';
import { UserTable } from './user-table/user-table';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductTree, UserTable],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected exampleInput: product = {
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
                price: 900 },
              {
                id: 7,
                name: 'Galaxy Note',
                price: 950
              },
            ],
          },
        ],
      }
    ]
  };

  emittedPath = signal<string>('');

  formattedInput = computed(() => {
    return this.returnNode(this.exampleInput);
  });

  returnNode(node: displayedProduct):displayedProduct|product {
    if (node.children) {
      node.children.forEach((child) => {
        child = this.returnNode(child);
      });
    }
    if (node.children && node.children[0]) {
      const arr = node.children;
      const MAX = arr.reduce(function (a, b) {
        let V = b.price ? b.price : b.maxChildPrice ? b.maxChildPrice : 0;
        return Math.max(a, V);
      }, 0);
      node.maxChildPrice = MAX;
      return node
    }
    return node
  }

  showPath(path: string) {
    console.log(path);
    this.emittedPath.set(path);
  }
}
