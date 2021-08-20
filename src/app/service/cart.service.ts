import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoursePayload } from '../model/course-payload';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private countSource = new BehaviorSubject<string>('0');
  count = this.countSource.asObservable();

  private items: Array<CoursePayload> = [];

  constructor() {}

  changeCount(count: string) {
    this.countSource.next(count);
  }

  // Get items in the Cart
  getItems(): Array<CoursePayload> {
    return this.items;
  }

  // Add item to the cart
  addItem(product) {
    this.items.push(product);
    this.changeCount(this.items.length + '');
  }

  // Remove item from the cart
  removeItem(id) {
    this.items.map((item, index) => {
      if (item.id === id) {
        this.items.splice(index, 1);
      }
    });
    this.changeCount(this.items.length + '');
  }

  // Remove items added to the cart
  emptyCart() {
    this.items.length = 0;
    this.changeCount(this.items.length + '');
  }

  // Calculate total price on item added to the cart
  getTotalPrice() {
    let total = 0;
    this.items.map(item => {
      total += 0;
    });

    return total
  }
}
