import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ReportModule } from '../../report.module';
import { ReportModuleState } from '../reducers';

export const selectContractModuleState = createFeatureSelector<ReportModule>('reportModule');

export const getReportContractById = (id: string) => createSelector(
  selectContractModuleState,
  (state: ReportModuleState) => state?.contract?.entities[id]
);
