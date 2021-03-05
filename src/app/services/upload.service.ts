import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class UploadService extends BaseService<any> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'upload', storageSrv);
  }
}
