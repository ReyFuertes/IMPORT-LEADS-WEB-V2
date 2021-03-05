import { IContract } from '../contract.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({ providedIn: 'root' })
export class ContractsService extends BaseService<IContract> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'contracts', storageSrv);
  }
}
