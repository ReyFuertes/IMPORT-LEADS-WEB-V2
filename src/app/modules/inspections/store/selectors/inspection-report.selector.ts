import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { InspectionModuleState } from '../reducers';

export const selectContractModuleState = createFeatureSelector<InspectionModuleState>('inspectionModule');
export const getInspectionProductReportSelector = createSelector(
  selectContractModuleState,
  state => state?.inspectionReport?.products
);
export const getInspectionsLineReportSelector = createSelector(
  selectContractModuleState,
  state => state?.inspectionReport?.inspectionsLineReport
);