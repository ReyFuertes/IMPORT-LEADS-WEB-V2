import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { IActiveInspection, IInspectionRun, IInspectionChecklist } from './inspections.models';

@Injectable({ providedIn: 'root' })
export class InspectionsService extends BaseService<IActiveInspection> {
  constructor(http: HttpClient) {
    super(http, 'inspection');
  }
}
@Injectable({ providedIn: 'root' })
export class InspectionRunService extends BaseService<IInspectionRun> {
  constructor(http: HttpClient) {
    super(http, 'inspection-run');
  }
}
@Injectable({ providedIn: 'root' })
export class InspectionChecklistService extends BaseService<IInspectionChecklist | IInspectionRun> {
  constructor(http: HttpClient) {
    super(http, 'inspection-checklist');
  }
}
