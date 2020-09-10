import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromInspection from './inspection.reducer'

export const selectedState = (state: AppState) => state.inspection;
export const getInspectionRunSelector = createSelector(
  selectedState,
  state => state?.runInspection
);
export const getActiveInspectionsSelector = createSelector(
  selectedState,
  state => state?.activeInspection || []
);
export const hasInspectionLoadedSelector = createSelector(
  selectedState,
  state => state?.loaded
);