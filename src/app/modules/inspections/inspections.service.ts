import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { IActiveInspection, IInspectionRun, IInspectionRuntime, IInspectionBarReport, IInspection, IInspectionChecklistImage } from './inspections.models';
@Injectable({ providedIn: 'root' })
export class InspectionReportService extends BaseService<IInspectionBarReport | { id }> {
  constructor(http: HttpClient) {
    super(http, 'inspection-report');
  }
}
@Injectable({ providedIn: 'root' })
export class InspectionsService extends BaseService<IActiveInspection> {
  constructor(http: HttpClient) {
    super(http, 'inspection');
  }
}
@Injectable({ providedIn: 'root' })
export class InspectionChecklistRunService extends BaseService<IInspectionRun | IInspectionRuntime | { id: string, copyCount: number, contractProductId?: string, saved_checklist_id?: string, inspection?: IInspection } | { saved_checklist_id: string, position: number } | { id: string } | any> {
  constructor(http: HttpClient) {
    super(http, 'inspection-checklist-run');
  }
}
@Injectable({ providedIn: 'root' })
export class InspectionRuntimeService extends BaseService<IInspectionRuntime> {
  constructor(http: HttpClient) {
    super(http, 'inspection-runtime');
  }
}
@Injectable({ providedIn: 'root' })
export class InspectionChecklistCommentService extends BaseService<IInspectionRun | string> {
  constructor(http: HttpClient) {
    super(http, 'inspection-checklist-comment');
  }
}
@Injectable({ providedIn: 'root' })
export class InspectionChecklistImageService extends BaseService<IInspectionRun | IInspectionChecklistImage | any> {
  constructor(http: HttpClient) {
    super(http, 'inspection-checklist-image');
  }
}