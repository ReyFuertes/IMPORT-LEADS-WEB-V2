import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { IActiveInspection, IInspectionRun, IInspectionRuntime, IInspection, IInspectionChecklistImage, IInspectionBarReport } from './inspections.models';
import { StorageService } from 'src/app/services/storage.service';
@Injectable({ providedIn: 'root' })
export class InspectionReportService extends BaseService<IInspectionBarReport | { id }> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'inspection-report', storageSrv);
  }
}
@Injectable({ providedIn: 'root' })
export class InspectionsService extends BaseService<IActiveInspection> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'inspection', storageSrv);
  }
}
@Injectable({ providedIn: 'root' })
export class InspectionChecklistRunService extends BaseService<IInspectionRun | IInspectionRuntime | { id: string, copyCount: number, contractProductId?: string, saved_checklist_id?: string, inspection?: IInspection } | { saved_checklist_id: string, position: number } | { id: string } | any> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'inspection-checklist-run', storageSrv);
  }
}
@Injectable({ providedIn: 'root' })
export class InspectionRuntimeService extends BaseService<IInspectionRuntime> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'inspection-runtime', storageSrv);
  }
}
@Injectable({ providedIn: 'root' })
export class InspectionChecklistCommentService extends BaseService<IInspectionRun | string> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'inspection-checklist-comment', storageSrv);
  }
}
@Injectable({ providedIn: 'root' })
export class InspectionChecklistImageService extends BaseService<IInspectionRun | IInspectionChecklistImage | any> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'inspection-checklist-image', storageSrv);
  }
}