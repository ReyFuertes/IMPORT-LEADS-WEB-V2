import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { ILoginUser } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService<ILoginUser> {
  constructor(http: HttpClient) {
    super(http, 'auth');
  }
}