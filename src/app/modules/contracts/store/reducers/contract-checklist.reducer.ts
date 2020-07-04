import { loadChecklistSuccess } from './../../../inspections/store/inspection.action';
import { ContractModuleState } from './index';
import { addTermToChecklistAction, removeSelectedTerm, addToChecklistProductsAction, addToChecklistSourceAction, removeToChecklistSourceAction, removeToChecklistProductsAction, highlightChecklist } from './../actions/contract-checklist.action';
import { IContractChecklist, IContractChecklistItem, IContractProduct } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as _ from 'lodash';

export interface ContractChecklistState extends EntityState<IContractChecklistItem> {
  isHighlighting?: boolean,
  selectedTerms?: IContractChecklistItem[];
  checklistProducts?: IContractProduct[];
  checklistSource?: IContractChecklistItem;
}
export const adapter: EntityAdapter<IContractChecklistItem> = createEntityAdapter<IContractChecklistItem>({});
export const initialState: ContractChecklistState = adapter.getInitialState({
  isHighlighting: null,
  selectedTerms: null,
  checklistProducts: null,
  checklistSource: null
});
const reducer = createReducer(
  initialState,
  /* add & remove checklist source */
  on(removeToChecklistSourceAction, (state, action) => {
    let checklistSource = Object.assign({}, state.checklistSource);
    if (state.checklistSource.id === action.item.id) {
      checklistSource = null;
    }
    return Object.assign({}, state, { checklistSource });
  }),
  on(addToChecklistSourceAction, (state, action) => {
    return Object.assign({}, state, { checklistSource: action.item });
  }),
  /* add & remove checklist products */
  on(removeToChecklistProductsAction, (state, action) => {
    let checklistProducts = Object.assign([], state.checklistProducts);
    _.remove(checklistProducts, { id: action.item.id });
    return Object.assign({}, state, { checklistProducts });
  }),
  on(addToChecklistProductsAction, (state, action) => {
    let checklistProducts: IContractProduct[] = Object.assign([], state.checklistProducts);
    const match = checklistProducts.filter(cp => cp.id === action.item.id).shift();
    if (!match) checklistProducts.push(action.item);
    return Object.assign({}, state, { checklistProducts });
  }),
  on(loadChecklistSuccess, (state, action) => {
    return ({ ...adapter.addAll(action.items, state) })
  }),
  on(removeSelectedTerm, (state, action) => {
    const selectedTerms = Object.assign([], state.selectedTerms);
    _.remove(selectedTerms, {
      checklist_product: { id: action.id }
    });
    return Object.assign({}, state, { selectedTerms });
  }),
  on(addTermToChecklistAction, (state, action) => {
    const selectedTerms = Object.assign([], state.selectedTerms);

    if (selectedTerms && selectedTerms.length === 0) {
      selectedTerms.push(...action.items);
    } else {
      action.items && action.items.forEach(item => {
        selectedTerms && selectedTerms.forEach(term => {
          if (term.id !== item.id) {
            selectedTerms.push(item);
          }
        });
      });
    }
    return Object.assign({}, state, { selectedTerms });
  }),
  on(highlightChecklist, (state, action) => {
    return Object.assign({}, state, { isHighlighting: action.highlight });
  }),
  // on(clearChecklist, (state) => {
  //   return Object.assign({}, state, { checklist: null });
  // }),
  // on(addToChecklistSuccess, (state, action) => {
  //   let checklist = Object.assign([], state.checklist);
  //   action && action.items.forEach(item => {
  //     checklist.push(item);
  //   });
  //   return Object.assign({}, state, { checklist });
  // }),
  // on(saveToChecklistSuccess, (state, action) => {
  //   return Object.assign({}, state, { checklist: action.payload });
  // }),
  // on(deleteChecklistItemSuccess, (state, action) => {
  //   /* remove from preselected products */
  //   const checklist = Object.assign([], state.checklist);
  //   action.deleted.forEach(item => {
  //     _.remove(checklist, {
  //       id: item.id
  //     });
  //   });
  //   return Object.assign({}, state, { checklist });
  // })
);
export function ContractChecklistReducer(state: ContractChecklistState, action: Action) {
  return reducer(state, action);
}
