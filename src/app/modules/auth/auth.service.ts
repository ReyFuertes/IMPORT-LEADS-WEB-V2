import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { ILoginCred } from './auth.model';
import { IUser } from '../user-management/user-mgmt.model';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService<ILoginCred | IUser> {
  constructor(http: HttpClient) {
    super(http, 'auth');
  }
}