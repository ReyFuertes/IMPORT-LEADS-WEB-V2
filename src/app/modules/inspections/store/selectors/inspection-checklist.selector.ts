import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { InspectionModuleState } from '../reducers';

export const selectContractModuleState = createFeatureSelector<InspectionModuleState>('inspectionModule');
