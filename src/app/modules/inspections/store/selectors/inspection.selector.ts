import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InspectionModuleState } from '../reducers';

export const selectContractModuleState = createFeatureSelector<InspectionModuleState>('inspectionModule');
export const getPrevExistErrorSelector = createSelector(
  selectContractModuleState,
  state => state?.inspection?.prevExistError
);
export const getUpdatedInspectionRunSelector = createSelector(
  selectContractModuleState,
  state => state?.inspection?.updatedRunInspection
);
export const getInspectionDetailSelector = createSelector(
  selectContractModuleState,
  state => state?.inspection?.detail
);
export const getIsStopSelector = createSelector(
  selectContractModuleState,
  state => state?.inspection?.isPaused
);
export const getInspectionRunStatusSelector = createSelector(
  selectContractModuleState,
  state =>   state?.inspection?.runInspection?.run_status
);
export const getInspectionRunFilterByProductIdSelector = (id: string) => createSelector(
  selectContractModuleState,
  state => {
    const contract_product = state?.inspection?.runInspection?.saved_checklist_items?.find(i => i?.contract_product?.id === id);

    const checklist = Object.assign({}, state?.inspection?.runInspection?.saved_checklist, { contract_product })
    return Object.assign({}, state?.inspection?.runInspection, { checklist });
  }
);
export const getInspectionRunSelector = createSelector(
  selectContractModuleState,
  state => state?.inspection?.runInspection
);
export const getFinishedInspectionsSelector = createSelector(
  selectContractModuleState,
  state => state?.inspection?.finishedInspections
);
export const getActiveInspectionsSelector = createSelector(
  selectContractModuleState,
  state => state?.inspection?.activeInspection
);