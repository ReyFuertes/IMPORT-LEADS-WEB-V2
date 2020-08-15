import {
  addItemToChecklistTermsAction, removeTermFormChecklistAction, addItemToChecklistProductsAction, addItemToSourceAction, removeItemFromChecklistProductsAction,
  clearChecklistSourceAction,
  clearAllSelectedTerms,
  setToMultiUpdateStatusAction,
  resetUpdateStatusAction,
  addItemToChecklistItemsAction,
  processItemsToChecklistAction,
  loadChecklistSuccessAction,
  processItemsToChecklistEntitiesAction,
  removeItemFromEntitiesAction,
  clearChecklistProductsAction,
  removeItemFromEntitiesByProductId
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
  isHighlighting: null,
  checklistTerms: null,
  checklistProducts: null,
  checklistSource: null,
  multiUpdate: null,
  checklistItems: null
});

const reducer = createReducer(
  initialState,
  on(removeItemFromEntitiesByProductId, (state, action) => {
    const entities = Object.values(state.entities);
    const matches = entities && entities.filter(e => e.checklist_product.product.id === action.id);
 
    return adapter.removeMany(matches.map(m => m.id), state);
  }),
  on(clearChecklistProductsAction, (state) => {
    return Object.assign({}, state, { checklistProducts: null });
  }),
  on(clearChecklistSourceAction, (state) => {
    return Object.assign({}, state, { checklistSource: null });
  }),
  on(loadChecklistSuccessAction, (state, action) => {
    return ({ ...adapter.addAll(action.items, state) })
  }),
  on(clearAllSelectedTerms, (state) => {
    return Object.assign({}, state, { checklistTerms: null });
  }),
  on(removeItemFromEntitiesAction, (state, action) => {
    const match = state && Object.values(state.entities)
      .filter(t => t.checklist_product.product.id === action.item.checklist_product.product.id
        && t.checklist_term.id === action.item.checklist_term.id);

    if (match && match.length > 0)
      return adapter.removeMany(match.map(m => m.id), state);
    else return state
  }),
  /* REMOVE ITEM TO CHECKLIST TERMS */
  on(removeTermFormChecklistAction, (state, action) => {
    const items = state.checklistTerms
      && state.checklistTerms.filter(t => t.term_id === action.term.term_id);

    let checklistTerms: IContractTermProduct[] = Object.assign([], state.checklistTerms);
    if (items && items.length > 0) {
      items.forEach(item => {
        _.remove(checklistTerms, { term_id: item.term_id });
      });
    }

    return Object.assign({}, state, { checklistTerms });
  }),
  on(processItemsToChecklistEntitiesAction, (state) => {
    let items = processToItem(state, false);

    if (items && items.length > 0) {
      let itemsArr: any[] = [];
      items.forEach(item => {
        if (!item.id) item.id = uuid(); /* add temporary id */
        itemsArr.push(item);
      });

      return adapter.addMany(itemsArr, state)
    } else return state;
  }),
  /* PROCESS PRODUCTS AND TERMS TO CHECKLIST ITEMS */
  on(processItemsToChecklistAction, (state) => {
    const checklistItems = processToItem(state, true);
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
    return Object.assign({}, state, { multiUpdate: null });
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
    let matches = checklistProducts.filter(cp => action.item.id === cp.id);

    if (matches && matches.length) {
      matches.forEach(match => {
        _.remove(checklistProducts, { id: match.id });
      });
    }

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
      checklistSource = null;

    return Object.assign({}, state, { checklistSource });
  })
);
export function ContractChecklistReducer(state: ContractChecklistState, action: Action) {
  return reducer(state, action);
}

function processToItem(state: ContractChecklistState, bucket: boolean): IContractChecklistItem[] {
  const products = state.checklistProducts || [];
  const terms = state.checklistTerms || [];
  let checklistItems: IContractChecklistItem[] = [];

  products.forEach(product => {
    terms.forEach(term => {
      const searchBucket = (bucket ? state.checklistItems : Object.values(state.entities)) || [];
      const match = searchBucket
        && searchBucket.length > 0
        && searchBucket.filter(i => i.checklist_term.id === term.term_id
          && product.id === i.checklist_product.product.id).shift();

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