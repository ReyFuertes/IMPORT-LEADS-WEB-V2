import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { IUserProfile } from './users.models';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseService<IUserProfile> {
  constructor(http: HttpClient) {
    super(http, 'user');
  }
}
@Injectable({ providedIn: 'root' })
export class UserProfileService extends BaseService<IUserProfile> {
  constructor(http: HttpClient) {
    super(http, 'user-profile');
  }
}