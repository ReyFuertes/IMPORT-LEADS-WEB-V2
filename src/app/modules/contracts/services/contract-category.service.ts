import { ICategoryContract, IContractCategory } from './../contract.model';
import { IContract } from '../contract.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { IUserSettingsContractResponse } from '../../users/users.models';

@Injectable({ providedIn: 'root' })
export class ContractCategoryService extends BaseService<IContractCategory | IUserSettingsContractResponse[] | ICategoryContract[]> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'contract-category', storageSrv);
  }
}
