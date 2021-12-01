import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchValue!: string; 

  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  constructor(private productService: ProductService, 
              private cartService: CartService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleListProducts();
    })
  }

  handleListProducts() {
    const hasSearch: boolean = this.route.snapshot.paramMap.has('keyword');
    if (hasSearch) {
      this.listSearchProducts();
    } else {
      this.listProducts();
    }
  }

  listProducts() {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }

    //pages

    if(this.currentCategoryId!=this.previousCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(this.thePageNumber-1, this.thePageSize, this.currentCategoryId)
                                              .subscribe((data)=> { 
                                                  this.products = data._embedded.products;
                                                  this.thePageNumber = data.page.number + 1;
                                                  this.thePageSize = data.page.size;
                                                  this.theTotalElements = data.page.totalElements;
                                              });
  }

  listSearchProducts() {
    this.searchValue = this.route.snapshot.paramMap.get('keyword')!;

    this.productService.getSearchProducts(this.searchValue).subscribe(products => 
      this.products = products);
  }

  addToCart(product: Product) {
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }

}
