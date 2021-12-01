import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrlProduct = "http://localhost:8080/api/products";
  private apiUrlCategory = "http://localhost:8080/api/product-category";

  constructor(private http: HttpClient) { }

  getProducts(theCategoryId: number): Observable<Product[]> {
    const url = `${this.apiUrlProduct}/search/findByCategoryId?id=${theCategoryId}`;

    return this.http.get<GetResponseProducts>(url).pipe(
      map(response => response._embedded.products));
  }
  getProduct(id: number): Observable<Product> {
    const singleProductUrl = `${this.apiUrlProduct}/${id}`;

    return this.http.get<Product>(singleProductUrl);
  }

  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProducts> {
    const pageUrl = `${this.apiUrlProduct}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
    return this.http.get<GetResponseProducts>(pageUrl);
  }

  getCategories(): Observable<ProductCategory[]> {
    return this.http.get<GetResponseCategory>(this.apiUrlCategory).pipe(
      map(response => response._embedded.productCategory));
  }

  getSearchProducts(value: string): Observable<Product[]> {
    const searchUrl = `${this.apiUrlProduct}/search/findByNameContaining?name=${value}`;
    return this.http.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products));
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
