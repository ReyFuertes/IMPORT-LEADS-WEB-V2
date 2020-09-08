import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromInspection from './inspection.reducer'

export const selectedState = (state: AppState) => state.inspection;
export const getActiveInspectionsSelector = createSelector(
  selectedState,
  state => state.activeInspection || []
);
// export const getInspectionChecklistSelector = createSelector(
//   selectedState,
//   state => state.inspectionChecklist || []
// );
// export const getInspectionChecklistByIdSelector = (id: string) => createSelector(
//   selectedState,
//   state => state.inspectionChecklist[id]
// );
