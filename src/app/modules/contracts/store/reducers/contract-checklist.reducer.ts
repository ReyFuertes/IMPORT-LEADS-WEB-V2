import { loadChecklistSuccess } from './../../../inspections/store/inspection.action';
import { ContractModuleState } from './index';
import {
  addTermToChecklistAction, removeSelectedTerm, addToChecklistProductsAction, addToChecklistSourceAction, removeToChecklistSourceAction, removeToChecklistProductsAction, highlightChecklist, overrideChecklistItemActionSuccess,
  removeChecklistItemAction,
  addToChecklistSuccess
} from './../actions/contract-checklist.action';
import { IContractChecklist, IContractChecklistItem, IContractProduct } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as _ from 'lodash';
import { act } from '@ngrx/effects';

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
  on(overrideChecklistItemActionSuccess, (state, action) => {
    debugger
    let selectedTerms = Object.assign([], state.selectedTerms);
    const match = selectedTerms.filter((st: IContractChecklistItem) =>
      st.checklist_term.id === action.item.checklist_term.id).shift();
    if (!match) {
      selectedTerms.push(action.item);
    }

    return Object.assign({}, state, { selectedTerms });
  }),
  on(removeChecklistItemAction, (state, action) => {
    return ({ ...adapter.removeOne(action.item.id, state) });
  }),
  /* add & remove checklist source */
  on(removeToChecklistSourceAction, (state, action) => {
    let checklistSource = Object.assign({}, state.checklistSource);
    if (checklistSource && action.item && checklistSource.checklist_product.id === action.item._id) {
      checklistSource = null;
    }
    return Object.assign({}, state, { checklistSource });
  }),
  on(addToChecklistSourceAction, (state, action) => {
    const items = Object.values(state.entities);
    const checklistSource = items.filter(ci => ci.checklist_product.id === action.item.checklist_product.id
      && ci.checklist_contract.id === action.item.checklist_contract.id).shift();

    return Object.assign({}, state, { checklistSource });
  }),
  /* add & remove checklist products */
  on(removeToChecklistProductsAction, (state, action) => {
    let checklistProducts = Object.assign([], state.checklistProducts);
    _.remove(checklistProducts, { id: action.item.id });
    return Object.assign({}, state, { checklistProducts });
  }),
  on(addToChecklistProductsAction, (state, action) => {
    let checklistProducts: IContractProduct[] = Object.assign([], state.checklistProducts) || null;
    let match = checklistProducts.filter(cp => cp.id === action.item.id).shift();
    if (!match) checklistProducts.push(action.item);
    return Object.assign({}, state, { checklistProducts });
  }),
  on(loadChecklistSuccess, (state, action) => {
    return ({ ...adapter.addAll(action.items, state) })
  }),
  on(removeSelectedTerm, (state, action) => {
    let selectedTerms = Object.assign([], state.selectedTerms);
    _.remove(selectedTerms, {
      checklist_product: { id: action.id }
    });
    return Object.assign({}, state, { selectedTerms });
  }),
  on(addTermToChecklistAction, (state, action) => {
    let selectedTerms = Object.assign([], state.selectedTerms);

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
  on(addToChecklistSuccess, (state, action) => {
    return adapter.addMany(action.items, state)
  }),
  /* if when adding a checklist item and no source is set, then add the newly created item as a source */
  on(addToChecklistSuccess, (state, action) => {
    let checklistSource: IContractChecklistItem = state.checklistSource;
    if (state && !checklistSource && action.items) {
      checklistSource = action.items.shift();
    }
    return Object.assign({}, state, { checklistSource });
  }),

  // tap((items) => {
  //   const item = items.shift();
  //   debugger
  //   /* listen to checklist source */
  //   this.store.pipe(select(getChecklistSourceSelector),
  //     tap(source => {
  //       debugger
  //       if (!source && item)
  //         this.store.dispatch(addToChecklistSourceAction({ item }))
  //     })).subscribe();
  // }),
  // on(clearChecklist, (state) => {
  //   return Object.assign({}, state, { checklist: null });
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
