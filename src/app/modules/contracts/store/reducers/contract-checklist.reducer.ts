import {
  addItemToChecklistTermsAction, removeTermFormChecklistAction, addItemToChecklistProductsAction, addItemToSourceAction, removeItemFromChecklistProductsAction,
  clearChecklistSourceAction,
  clearAllSelectedTerms,
  setToMultiUpdateStatusAction,
  resetUpdateStatusAction,
  addItemToChecklistItemsAction,
  processItemsToChecklistAction,
  loadChecklistSuccessAction,
  processItemsToChecklistEntitiesAction
} from './../actions/contract-checklist.action';
import { IContractChecklistItem, ICommonIdPayload, IContractTermProduct, ISavedChecklistItem } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';

export interface ContractChecklistState extends EntityState<IContractChecklistItem> {
  isHighlighting?: boolean,
  checklistTerms?: IContractTermProduct[];
  checklistProducts?: ICommonIdPayload[];
  checklistSource?: ICommonIdPayload;
  multiUpdate?: boolean;
  checklistItems?: IContractChecklistItem[]
}
export const adapter: EntityAdapter<IContractChecklistItem> = createEntityAdapter<IContractChecklistItem>({});
export const initialState: ContractChecklistState = adapter.getInitialState({
  isHighlighting: undefined,
  checklistTerms: undefined,
  checklistProducts: undefined,
  checklistSource: undefined,
  multiUpdate: undefined,
  checklistItems: undefined
});

const reducer = createReducer(
  initialState,
  on(clearChecklistSourceAction, (state) => {
    return Object.assign({}, state, { checklistSource: undefined });
  }),
  on(loadChecklistSuccessAction, (state, action) => {
    return ({ ...adapter.addAll(action.items, state) })
  }),
  on(clearAllSelectedTerms, (state) => {
    return Object.assign({}, state, { checklistTerms: undefined });
  }),
  /* REMOVE ITEM TO CHECKLIST TERMS */
  on(removeTermFormChecklistAction, (state, action) => {
    const match = state.checklistTerms
      && state.checklistTerms.filter(t => t.term_id === action.term.term_id).shift();

    let checklistTerms: IContractTermProduct[] = Object.assign([], state.checklistTerms);
    if (match)
      _.remove(checklistTerms, { term_id: action.term.term_id });

    return Object.assign({}, state, { checklistTerms });
  }),
  on(processItemsToChecklistEntitiesAction, (state) => {
    let item = processToItem(state).shift();
    //item.id = uuid(); /* add temporary id */

    return adapter.addOne(item, state)
  }),
  /* PROCESS PRODUCTS AND TERMS TO CHECKLIST ITEMS */
  on(processItemsToChecklistAction, (state) => {
    const checklistItems = processToItem(state);
    return Object.assign({}, state, { checklistItems });
  }),
  /* ADD ITEM TO CHECKLIST TERMS */
  on(addItemToChecklistTermsAction, (state, action) => {
    const match = state.checklistTerms
      && state.checklistTerms.filter(t => t.term_id === action.term.term_id).shift();

    let checklistTerms: IContractTermProduct[] = Object.assign([], state.checklistTerms);
    if (!match)
      checklistTerms.push(action.term);

    return Object.assign({}, state, { checklistTerms });
  }),
  /* ADD ITEM TO CHECKLIST ITEMS */
  on(addItemToChecklistItemsAction, (state, action) => {
    const match = state.checklistItems
      && state.checklistItems.filter(
        t => t.checklist_term.id === action.item.checklist_term.id
          && t.checklist_product.id === action.item.checklist_product.id).shift();

    let checklistItems: IContractChecklistItem[] = Object.assign([], state.checklistItems);
    if (!match)
      checklistItems.push(action.item);
    else
      _.remove(checklistItems, {
        checklist_term: { id: action.item.checklist_term.id },
        checklist_product: { id: action.item.checklist_product.id }
      });

    return Object.assign({}, state, { checklistItems });
  }),
  on(resetUpdateStatusAction, (state) => {
    return Object.assign({}, state, { multiUpdate: undefined });
  }),
  on(setToMultiUpdateStatusAction, (state) => {
    return Object.assign({}, state, { multiUpdate: true });
  }),
  /* ADD ITEM TO CHECKLIST OF PRODUCTS */
  on(addItemToChecklistProductsAction, (state, action) => {
    let checklistProducts: ICommonIdPayload[] = [];
    let match = state.checklistProducts && state.checklistProducts.filter(cp => action.item.id === cp.id).shift();
    if (!match)
      checklistProducts.push(action.item);
    else /* we add remove here just to make sure we dont have redundant item */
      _.remove(checklistProducts, { id: action.item.id });

    if (state.checklistProducts)
      checklistProducts = checklistProducts.concat(state.checklistProducts);

    return Object.assign({}, state, { checklistProducts });
  }),
  /* REMOVE ITEM TO CHECKLIST OF PRODUCTS */
  on(removeItemFromChecklistProductsAction, (state, action) => {
    let checklistProducts: ICommonIdPayload[] = state.checklistProducts || [];
    let match = checklistProducts.filter(cp => action.item.id === cp.id).shift();
    if (match)
      _.remove(checklistProducts, { id: action.item.id });

    return Object.assign({}, state, { checklistProducts });
  }),
  /* ADD ITEM TO CHECKLIST OF SOURCE */
  on(addItemToSourceAction, (state, action) => {
    const match = state.checklistSource
      && state.checklistSource.id === action.item.id;
    let checklistSource: ICommonIdPayload = Object.assign({}, state.checklistSource);
    if (!match)
      checklistSource = action.item
    else
      checklistSource = undefined;

    return Object.assign({}, state, { checklistSource });
  })
);
export function ContractChecklistReducer(state: ContractChecklistState, action: Action) {
  return reducer(state, action);
}

function processToItem(state: ContractChecklistState): IContractChecklistItem[] {
  const products = state.checklistProducts || [];
  const terms = state.checklistTerms || [];
  let checklistItems: IContractChecklistItem[] = [];

  products.forEach(product => {
    terms.forEach(term => {
      const match = checklistItems.filter(i => i.checklist_term.id === term.term_id
        && product.id === i.checklist_product.id).shift();

      if (!match) {
        checklistItems.push({
          checklist_contract: { id: term.contract_id },
          checklist_category: { id: term.category_id },
          checklist_term: { id: term.term_id },
          checklist_product: { id: product._id, product: { id: product.id } }
        });
      } else {
        _.remove(checklistItems, {
          checklist_term: { id: term.term_id },
          checklist_product: { id: product.id }
        });
      }
    });
  });
  return checklistItems;
}