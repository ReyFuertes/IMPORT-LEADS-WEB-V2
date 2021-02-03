import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InspectionModuleState } from '../reducers';

export const selectContractModuleState = createFeatureSelector<InspectionModuleState>('inspectionModule');
export const getInspectionInspectorSelector = createSelector(
  selectContractModuleState,
  state => state?.inspectionReport?.inspector
);
export const getInspectionProductReportSelector = createSelector(
  selectContractModuleState,
  state => state?.inspectionReport?.products
);
export const getInspectionsLineReportSelector = createSelector(
  selectContractModuleState,
  state => state?.inspectionReport?.inspectionsLineReport
);