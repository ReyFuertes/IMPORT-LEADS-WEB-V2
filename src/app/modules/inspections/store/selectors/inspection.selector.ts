import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { InspectionModuleState } from '../reducers';

export const selectContractModuleState = createFeatureSelector<InspectionModuleState>('inspectionModule');
export const getInspectionRunFilterByProductIdSelector = (id: string) => createSelector(
  selectContractModuleState,
  state => {
    const items = state?.inspection?.runInspection?.checklist?.items.filter(i => i.contract_product.id === id);
    const checklist = Object.assign({}, state?.inspection?.runInspection?.checklist, { items })
    const ret = Object.assign({}, state?.inspection?.runInspection, { checklist });
    return ret;
  }
);
export const getInspectionRunSelector = createSelector(
  selectContractModuleState,
  state => state?.inspection?.runInspection
);
export const getActiveInspectionsSelector = createSelector(
  selectContractModuleState,
  state => state?.inspection?.activeInspection
);
export const hasInspectionLoadedSelector = createSelector(
  selectContractModuleState,
  state => state?.inspection?.loaded
);