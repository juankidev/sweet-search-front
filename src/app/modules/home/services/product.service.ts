import { HttpBaseAppService } from './../../../core/services/http-base.service';
import { Product, PaginatedProducts, ApiResponseProducts } from './../models/product.model';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { ResponseAPI } from '../../../core/interfaces/response-api.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiProductsUrl = '/api/products'; // Reemplaza con tu URL real

  // Datos de ejemplo usando el modelo real del backend
  private mockProducts: Product[] = [];

  constructor(private HttpBaseAppService: HttpBaseAppService) {}

  getProducts(query:string): Observable<ApiResponseProducts> {
    return this.HttpBaseAppService.post<ApiResponseProducts>(this.apiProductsUrl, { query })
      .pipe(
        map((response: ApiResponseProducts) => response),
        catchError((error) => {
          console.error('Error en la llamada HTTP', error);
          return throwError(() => error);
        })
      );
  }
}
