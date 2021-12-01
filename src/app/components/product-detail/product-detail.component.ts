import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product();
  productId!: number;

  constructor(private route: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.showProductDetail();
    })
  }

  showProductDetail() {
    const productId: number = +this.route.snapshot.paramMap.get('id')!;
   
      this.productService.getProduct(productId).subscribe((data) => {
        this.product = data;
      });
      console.log(this.product);
  }

}
