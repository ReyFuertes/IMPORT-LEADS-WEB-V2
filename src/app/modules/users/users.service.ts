import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { IUserProfile } from './users.models';
import { IUser } from '../user-management/user-mgmt.model';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({ providedIn: 'root' })
export class UserProfileService extends BaseService<IUserProfile> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'user-profile', storageSrv);
  }
}
@Injectable({ providedIn: 'root' })
export class UserService extends BaseService<IUser> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'user', storageSrv);
  }
}

@Injectable({ providedIn: 'root' })
export class UserClientService extends BaseService<IUser> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'user-client', storageSrv);
  }
}
