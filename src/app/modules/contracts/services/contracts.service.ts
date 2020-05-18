import { IContract } from '../contract.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContractsService extends BaseService<IContract> {
  constructor(http: HttpClient) {
    super(http, 'contracts');
  }
}
