import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from 'src/app/store/app.reducer';
import { InspectionChecklistReducer, InspectionChecklistState } from './inspection-checklist.reducer';
import { InspectionReportReducer, InspectionReportState } from './inspection-report.reducer';
import { InspectionState, InspectionReducer } from './inspection.reducer';

export interface InspectionModuleState {
  inspection: InspectionState,
  inspectionChecklist: InspectionChecklistState,
  inspectionReport: InspectionReportState
}

export const reducers: ActionReducerMap<InspectionModuleState> = {
  inspection: InspectionReducer,
  inspectionChecklist: InspectionChecklistReducer,
  inspectionReport: InspectionReportReducer
};

export interface AppState extends fromRoot.AppState {
  inspectionModule: InspectionModuleState;
}


