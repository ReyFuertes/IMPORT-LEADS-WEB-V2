
import { IContractProduct, IContractTerm } from './../contract.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContractTermService extends BaseService<IContractTerm> {
  constructor(http: HttpClient) {
    super(http, 'contract-term');
  }
}
