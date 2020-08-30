import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { IUserMgmt } from './user-mgmt.model';

@Injectable({ providedIn: 'root' })
export class UserMgmtService extends BaseService<IUserMgmt> {
  constructor(http: HttpClient) {
    super(http, 'users');
  }
}