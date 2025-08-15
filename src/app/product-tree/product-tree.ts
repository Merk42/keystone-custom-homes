import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { displayedProduct } from '../types';

@Component({
  selector: 'kch-product-tree',
  imports: [CurrencyPipe],
  templateUrl: './product-tree.html',
  styleUrl: './product-tree.scss'
})
export class ProductTree {
  readonly data = input.required<displayedProduct>();
  readonly parents = input<string[]>([]);
  readonly pathEvent = output<string>();


  path = computed<string[]>(() => {
    return [...this.parents(), this.data().name]
  })
  id = computed<string>(() => {
    return `id-${this.data().id}`
  })

  emitPath() {
    this.pathEvent.emit(this.path().join(" > "));
  }

  bubbleEvent(path:string) {
    this.pathEvent.emit(path);
  }
}
