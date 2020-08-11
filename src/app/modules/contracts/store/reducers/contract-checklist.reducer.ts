import { loadInspectionChecklistSuccessAction } from './../../../inspections/store/inspection.action';
import { ContractModuleState } from './index';
import {
  addTermToChecklistAction, removeSelectedTermsAction, addToChecklistProductsAction, addToChecklistSourceAction, updateChecklistSourceAction, removeToChecklistProductsAction, highlightChecklistAction, overrideChecklistItemActionSuccess,
  removeChecklistSourceAction,
  addToChecklistSuccessAction,
  removeChecklistItemsSuccessAction,
  removeAllSelectedTerms,
  removeAllChecklistProductsAction
} from './../actions/contract-checklist.action';
import { IContractChecklist, IContractChecklistItem, IContractProduct, IContractTerm } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as _ from 'lodash';

export interface ContractChecklistState extends EntityState<IContractChecklistItem> {
  isHighlighting?: boolean,
  selectedTerms?: string[];
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
  /* clear the checklist entities first */
  on(overrideChecklistItemActionSuccess, (state) => {
    return adapter.removeAll(state);
  }),
  on(overrideChecklistItemActionSuccess, (state, action) => {
    return adapter.addAll(action.items, state);
  }),
  /* set selected terms from overriden checklist */
  on(overrideChecklistItemActionSuccess, (state, action) => {
    /* we need to get the checklist product terms */
    const checklistProducts = state.checklistProducts;
    const entities = Object.values(state.entities);
    const checklistItems = entities.filter(e => checklistProducts.filter(cp => cp._id === e.checklist_product.id));
    const selectedTerms = _.uniq(checklistItems.map(st => st.checklist_term.id));

    return Object.assign({}, state, { selectedTerms });
  }),
  on(removeChecklistItemsSuccessAction, (state, action) => {
    const ids = action.deleted.map(i => i.id) /* collect checklist item ids to be removed */
    return ({ ...adapter.removeMany(ids, state) });
  }),
  /* update checklist source */
  on(updateChecklistSourceAction, (state, action) => {
    let checklistSource = Object.assign({}, state.checklistSource);
    let terms: string[] = Object.assign([], state.selectedTerms);
    const checklistProducts = Object.assign([], state.checklistProducts);

    /* if the action item is a source then process */
    if (checklistSource 
      && action.item 
      && checklistSource.checklist_product
      && checklistSource.checklist_product.id === action.item._id) {
      /* remove the product */
      checklistSource = null;

      /* if the source is removed then replace it with first first item of product checklist */
      const checklistProductId = checklistProducts
        && checklistProducts.length > 0
        && checklistProducts.shift()._id
        || null;
      const entities = Object.values(state.entities);

      if (checklistProductId) {
        const newSource = entities.filter(e => {
          return e.checklist_product.id === checklistProductId;
        }).shift();

        checklistSource = newSource;
        /* we also need to update the selected term using the new source */
        terms = entities.filter(e => {
          return e.checklist_contract.id === newSource.checklist_contract.id
            && e.checklist_product.id === checklistProductId;
        }).map(ci => ci.checklist_term.id);
      }
    }
    return Object.assign({}, state, { checklistSource, selectedTerms: _.uniq(terms) });
  }),
  on(addToChecklistSourceAction, (state, action) => {
    const items = Object.values(state.entities);
    const checklistSource = items.filter(ci => ci.checklist_product.id === action.item.checklist_product.id
      && ci.checklist_contract.id === action.item.checklist_contract.id).shift();

    return Object.assign({}, state, { checklistSource });
  }),
  /* remove all source */
  on(removeChecklistSourceAction, (state) => {
    return Object.assign({}, state, { checklistSource: null });
  }),
  /* add & remove checklist products */
  on(removeToChecklistProductsAction, (state, action) => {
    let checklistProducts = Object.assign([], state.checklistProducts);
    _.remove(checklistProducts, { id: action.item.id });
    return Object.assign({}, state, { checklistProducts });
  }),
  on(addToChecklistProductsAction, (state, action) => {
    let checklistProducts: IContractProduct[] = Object.assign([], state.checklistProducts) || null;
    let match = checklistProducts.filter(cp => action.items.filter(i => i.id === cp.id)).shift();
    if (!match) checklistProducts.push(...action.items);

    return Object.assign({}, state, { checklistProducts });
  }),
  on(loadInspectionChecklistSuccessAction, (state, action) => {
    return ({ ...adapter.addAll(action.items, state) })
  }),
  on(removeAllSelectedTerms, (state) => {
    return Object.assign({}, state, { selectedTerms: null });
  }),
  on(removeAllChecklistProductsAction, (state) => {
    return Object.assign({}, state, { checklistProducts: null });
  }),
  on(removeSelectedTermsAction, (state, action) => {
    /* when the product is deselected we want to remove also the selected terms using the product id */
    let selectedTerms = Object.assign([], state.selectedTerms);
    action.ids && action.ids.length > 0 && action.ids.forEach(id => {
      const index: number = selectedTerms.indexOf(id);
      if (index !== -1) {
        selectedTerms.splice(index, 1);
      }
    });

    return Object.assign({}, state, { selectedTerms });
  }),
  on(addTermToChecklistAction, (state, action) => {
    let selectedTerms = Object.assign([], state.selectedTerms);

    if (selectedTerms && selectedTerms.length === 0) {
      selectedTerms.push(...action.ids);
    } else {
      action.ids && action.ids.forEach(termId => {
      selectedTerms && selectedTerms.forEach(selTermId => {
        if (selTermId !== termId) {
          selectedTerms.push(termId);
        }
      });
      });
    }
    return Object.assign({}, state, { selectedTerms });
  }),
  on(highlightChecklistAction, (state, action) => {
    return Object.assign({}, state, { isHighlighting: action.highlight });
  }),
  on(addToChecklistSuccessAction, (state, action) => {
    return adapter.addOne(action.item, state)
  }),
  /* if when adding a checklist item and no source is set, then add the newly created item as a source */
  on(addToChecklistSuccessAction, (state, action) => {
    let checklistSource: IContractChecklistItem = state.checklistSource;
    if (state && !checklistSource && action.item) {
      checklistSource = action.item;
    }
    return Object.assign({}, state, { checklistSource });
  })
);
export function ContractChecklistReducer(state: ContractChecklistState, action: Action) {
  return reducer(state, action);
}
