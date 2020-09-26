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
export class InspectionChecklistRunService extends BaseService<IInspectionRun | { id: string, copyCount: number } | { saved_checklist_id: string, position: number }> {
  constructor(http: HttpClient) {
    super(http, 'inspection-checklist-run');
  }
}
@Injectable({ providedIn: 'root' })
export class InspectionChecklistService extends BaseService<IInspectionChecklist | IInspectionRun | string> {
  constructor(http: HttpClient) {
    super(http, 'inspection-checklist');
  }
}

@Injectable({ providedIn: 'root' })
export class InspectionChecklistImageService extends BaseService<IInspectionChecklist | IInspectionRun> {
  constructor(http: HttpClient) {
    super(http, 'inspection-checklist-image');
  }
}