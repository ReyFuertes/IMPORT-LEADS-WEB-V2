import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { IUserView } from './view-permission.model';

@Injectable({ providedIn: 'root' })
export class UserViewService extends BaseService<IUserView> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'user-view', storageSrv);
  }
}