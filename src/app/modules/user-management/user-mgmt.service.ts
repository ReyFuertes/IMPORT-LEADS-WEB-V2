import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { IUserMgmt, IUserAccess, IRole } from './user-mgmt.model';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({ providedIn: 'root' })
export class UserManagementService extends BaseService<IUserMgmt> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'user', storageSrv);
  }
}
@Injectable({ providedIn: 'root' })
export class UserAccessService extends BaseService<IUserAccess> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'user-access', storageSrv);
  }
}
@Injectable({ providedIn: 'root' })
export class RolesService extends BaseService<IRole> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'roles', storageSrv);
  }
}
@Injectable({ providedIn: 'root' })
export class UserRolesService extends BaseService<IRole | string> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'user-role', storageSrv);
  }
}