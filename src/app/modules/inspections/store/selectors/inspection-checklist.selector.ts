import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { InspectionModuleState } from '../reducers';

export const selectContractModuleState = createFeatureSelector<InspectionModuleState>('inspectionModule');
export const getInsChecklistImagesSelector = createSelector(
  selectContractModuleState,
  state => state?.inspectionChecklist?.checklistImages
);