import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { IActiveInspection } from './inspections.models';

@Injectable({ providedIn: 'root' })
export class InspectionsService extends BaseService<IActiveInspection> {
  constructor(http: HttpClient) {
    super(http, 'inspection');
  }
}
