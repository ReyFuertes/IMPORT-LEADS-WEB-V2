import { IContractProduct } from './../contract.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContractProductService extends BaseService<IContractProduct> {
  constructor(http: HttpClient) {
    super(http, 'contract-products');
  }
}
