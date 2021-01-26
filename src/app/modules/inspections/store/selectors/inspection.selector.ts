import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InspectionModuleState } from '../reducers';

export const selectContractModuleState = createFeatureSelector<InspectionModuleState>('inspectionModule');
export const getInspectionDetailSelector = createSelector(
  selectContractModuleState,
  state => state?.inspection?.detail
);
export const getIsPausedSelector = createSelector(
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

    const checklist = Object.assign({}, state?.inspection?.runInspection?.checklist, { contract_product })
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
export const hasInspectionLoadedSelector = createSelector(
  selectContractModuleState,
  state => state?.inspection?.loaded
);