import { createFeatureSelector, createSelector } from '@ngrx/store';
import { sortByAsc, sortByDesc } from 'src/app/shared/util/sort';
import { InspectionModuleState } from '../reducers';

export const selectContractModuleState = createFeatureSelector<InspectionModuleState>('inspectionModule');
export const getInsChecklistImagesSelector = createSelector(
  selectContractModuleState,
  state => {
    let sorted_images = Object.assign([], state?.inspectionChecklist?.checklistImages);
    return sorted_images.sort((a, b) => sortByAsc(a, b, 'position'));
  }
);