import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { IAccess } from '../models/user.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AccessService extends BaseService<IAccess> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'access', storageSrv);
  }
}
