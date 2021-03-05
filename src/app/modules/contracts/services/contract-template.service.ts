import { IContractProduct, IContractTemplatePayload } from './../contract.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({ providedIn: 'root' })
export class ContractTemplateService extends BaseService<IContractTemplatePayload> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'contract-template', storageSrv);
  }
}
