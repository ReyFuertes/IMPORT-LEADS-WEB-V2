import { IContract } from '../contract.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';

@Injectable({ providedIn: 'root' })
export class ContractsService extends BaseService<IContract | ISimpleItem> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'contracts', storageSrv);
  }
}
