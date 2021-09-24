import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public searchValue = new BehaviorSubject<string>("");

  constructor() { }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product); //spread er offiset det værte jeg har sett lol...
    this.productList.next(product);
  }

  addToCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((e: any) => {
      grandTotal += e.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any) {
    this.cartItemList.map((e: any, index: number) => {
      if (product.id == e.id) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAll() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
