import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InspectionModuleState } from '../reducers';

export const selectContractModuleState = createFeatureSelector<InspectionModuleState>('inspectionModule');
export const getTagsReportSelector = createSelector(
  selectContractModuleState,
  state => state?.inspectionReport?.inspectionTagsReport
);
export const getInspectionFailedCommentsReportSelector = createSelector(
  selectContractModuleState,
  state => state?.inspectionReport?.inspectionFailedCommentsReport
);
export const getInspectionOkCommentsReportSelector = createSelector(
  selectContractModuleState,
  state => state?.inspectionReport?.inspectionOkCommentsReport
);
export const getInspectionInspectorSelector = createSelector(
  selectContractModuleState,
  state => state?.inspectionReport?.inspector
);
export const getInspectionProductReportSelector = createSelector(
  selectContractModuleState,
  state => state?.inspectionReport?.productsReport
);
export const getInspectionsLineReportSelector = createSelector(
  selectContractModuleState,
  state => state?.inspectionReport?.inspectionsBarChartReport
);