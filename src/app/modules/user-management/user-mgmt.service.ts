import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { IUserMgmt, IUserAccess } from './user-mgmt.model';

@Injectable({ providedIn: 'root' })
export class UserMgmtService extends BaseService<IUserMgmt> {
  constructor(http: HttpClient) {
    super(http, 'users');
  }
}
@Injectable({ providedIn: 'root' })
export class UserAccessService extends BaseService<IUserAccess> {
  constructor(http: HttpClient) {
    super(http, 'user-access');
  }
}