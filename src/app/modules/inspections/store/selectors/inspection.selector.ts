import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { InspectionModuleState } from '../reducers';

export const selectContractModuleState = createFeatureSelector<InspectionModuleState>('inspectionModule');
export const getInspectionRunSelector = createSelector(
  selectContractModuleState,
  state => state?.inspection?.runInspection
);
export const getActiveInspectionsSelector = createSelector(
  selectContractModuleState,
  state => state?.inspection?.activeInspection
);
export const hasInspectionLoadedSelector = createSelector(
  selectContractModuleState,
  state => state?.inspection?.loaded
);