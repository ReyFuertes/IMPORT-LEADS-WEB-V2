import { IProduct } from './products.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({ providedIn: 'root' })
export class ProductsService extends BaseService<IProduct> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'products', storageSrv);
  }
}
