import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { IUserManagement } from './user-management.model';

@Injectable({ providedIn: 'root' })
export class UserManagementService extends BaseService<IUserManagement> {
  constructor(http: HttpClient) {
    super(http, 'user-management');
  }
}