import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from 'src/app/store/app.reducer';
import { InspectionChecklistReducer, InspectionChecklistState } from './inspection-checklist.reducer';
import { InspectionState, InspectionReducer } from './inspection.reducer';

export interface InspectionModuleState {
  inspection: InspectionState,
  inspectionChecklist: InspectionChecklistState
}

export const reducers: ActionReducerMap<InspectionModuleState> = {
  inspection: InspectionReducer,
  inspectionChecklist: InspectionChecklistReducer
};

export interface AppState extends fromRoot.AppState {
  inspectionModule: InspectionModuleState;
}


