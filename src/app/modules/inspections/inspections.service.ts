import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InspectionsService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http, 'contract-inspection');
  }
}
