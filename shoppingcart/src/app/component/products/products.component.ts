import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productsList: any;
  public productTest: any;
  public filterCatagory: any;
  searchKey: string = "";
  constructor(private api: ApiService, private cartService: CartService, db: AngularFireDatabase) {
    db.list("products").valueChanges().subscribe(products => {
      console.log(products)
    })
  }

  ngOnInit(): void {
    this.api.getProducts()
      .subscribe(res => {
        this.productsList = res;
        this.filterCatagory = res;
        this.productsList.forEach((e: any) => {
          if (e.category === "women's clothing" || e.category === "men's clothing") {
            e.category = "fashion"
          }
          Object.assign(e, { quantity: 1, total: e.price })
        });
      });
    this.cartService.searchValue.subscribe((value: any) => {
      this.searchKey = value
    })
  }
  addToCart(item: any) {
    this.cartService.addToCart(item)
  }

  filter(category: string) {
    this.filterCatagory = this.productsList
      .filter((e: any) => {
        if (e.category == category || category === "") {
          return e;
        }
      })
  }

}
