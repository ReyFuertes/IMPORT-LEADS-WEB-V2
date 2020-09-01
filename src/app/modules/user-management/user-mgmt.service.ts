import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { IUserMgmt, IUserAccess, IRole } from './user-mgmt.model';

@Injectable({ providedIn: 'root' })
export class UserMgmtService extends BaseService<IUserMgmt> {
  constructor(http: HttpClient) {
    super(http, 'user');
  }
}
@Injectable({ providedIn: 'root' })
export class UserAccessService extends BaseService<IUserAccess> {
  constructor(http: HttpClient) {
    super(http, 'user-access');
  }
}
@Injectable({ providedIn: 'root' })
export class RolesService extends BaseService<IRole> {
  constructor(http: HttpClient) {
    super(http, 'roles');
  }
}
@Injectable({ providedIn: 'root' })
export class UserRolesService extends BaseService<IRole> {
  constructor(http: HttpClient) {
    super(http, 'user-role');
  }
}