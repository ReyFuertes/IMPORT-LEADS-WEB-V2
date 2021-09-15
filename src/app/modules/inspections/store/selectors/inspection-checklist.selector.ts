import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InspectionModuleState } from '../reducers';

export const selectContractModuleState = createFeatureSelector<InspectionModuleState>('inspectionModule');
export const getInsChecklistImagesSelector = createSelector(
  selectContractModuleState,
  state => state?.inspectionChecklist?.checklistImages
);