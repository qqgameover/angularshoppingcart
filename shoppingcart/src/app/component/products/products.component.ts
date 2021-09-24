import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productsList: any;
  searchKey: string = "";
  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.api.getProducts()
      .subscribe(res => {
        this.productsList = res;

        this.productsList.forEach((e: any) => {
          Object.assign(e, { quantity: 1, total: e.price })
        })
      })
    this.cartService.searchValue.subscribe((value: any) => {
      this.searchKey = value
    })
  }
  addToCart(item: any) {
    this.cartService.addToCart(item)
  }


}
