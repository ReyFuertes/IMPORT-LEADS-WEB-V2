import { loadInspectionChecklistSuccessAction } from './../../../inspections/store/inspection.action';
import { ContractModuleState } from './index';
import {
  addItemToChecklistTermsAction, removeTermFormChecklistAction, addItemToChecklistProductsAction, addItemToSourceAction, updateChecklistSourceAction, removeItemFromChecklistProductsAction, highlightChecklistAction, overrideChecklistItemActionSuccess,
  clearChecklistSourceAction,
  addToChecklistSuccessAction,
  removeChecklistItemsSuccessAction,
  clearAllSelectedTerms,
  removeAllChecklistProductsAction,
  setToMultiUpdateStatusAction,
  resetUpdateStatusAction,
  addItemToChecklistItemsAction,
  processItemsToChecklistAction,
  loadChecklistSuccessAction
} from './../actions/contract-checklist.action';
import { IContractChecklist, IContractChecklistItem, IContractProduct, IContractTerm, ICommonIdPayload, IContractTermProduct, ISavedChecklistItem } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as _ from 'lodash';

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
  on(processItemsToChecklistAction, (state) => {
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
            checklist_product: { id: product.id }
          });
        } else {
          _.remove(checklistItems, {
            checklist_term: { id: term.term_id },
            checklist_product: { id: product.id }
          });
        }
      });
    });

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







  // /* clear the checklist entities first */
  // on(overrideChecklistItemActionSuccess, (state) => {
  //   return adapter.removeAll(state);
  // }),
  // on(overrideChecklistItemActionSuccess, (state, action) => {
  //   return adapter.addAll(action.items, state);
  // }),
  // /* set selected terms from overriden checklist */
  // on(overrideChecklistItemActionSuccess, (state, action) => {
  //   /* we need to get the checklist product terms */
  //   const checklistProducts = state.checklistProducts;
  //   const entities = Object.values(state.entities);
  //   const checklistItems = entities.filter(e => checklistProducts.filter(cp => cp._id === e.checklist_product.id));
  //   const selectedTerms = _.uniq(checklistItems.map(st => st.checklist_term.id));

  //   return Object.assign({}, state, { selectedTerms });
  // }),
  // on(removeChecklistItemsSuccessAction, (state, action) => {
  //   const ids = action.deleted.map(i => i.id) /* collect checklist item ids to be removed */
  //   return ({ ...adapter.removeMany(ids, state) });
  // }),
  // /* update checklist source */
  // on(updateChecklistSourceAction, (state, action) => {
  //   let checklistSource = Object.assign({}, state.checklistSource);
  //   let terms: string[] = Object.assign([], state.selectedTerms);
  //   const checklistProducts = Object.assign([], state.checklistProducts);

  //   /* if the action item is a source then process */
  //   // if (checklistSource
  //   //   && action.item
  //   //   && checklistSource.checklist_product
  //   //   && checklistSource.checklist_product.id === action.item._id) {
  //   //   /* remove the product */
  //   //   checklistSource = null;

  //   //   /* if the source is removed then replace it with first first item of product checklist */
  //   //   const checklistProductId = checklistProducts
  //   //     && checklistProducts.length > 0
  //   //     && checklistProducts.shift()._id
  //   //     || null;
  //   //   const entities = Object.values(state.entities);

  //   //   if (checklistProductId) {
  //   //     const newSource = entities.filter(e => {
  //   //       return e.checklist_product.id === checklistProductId;
  //   //     }).shift();

  //   //     checklistSource = newSource;
  //   //     /* we also need to update the selected term using the new source */
  //   //     terms = entities.filter(e => {
  //   //       return e.checklist_contract.id === newSource.checklist_contract.id
  //   //         && e.checklist_product.id === checklistProductId;
  //   //     }).map(ci => ci.checklist_term.id);
  //   //   }
  //   // }
  //   return Object.assign({}, state, { checklistSource, selectedTerms: _.uniq(terms) });
  // }),
  // /* remove all source */

  // /* add & remove checklist products */
  // on(removeItemFromChecklistProductsAction, (state, action) => {
  //   let checklistProducts = Object.assign([], state.checklistProducts);
  //   _.remove(checklistProducts, { id: action.item.id });
  //   return Object.assign({}, state, { checklistProducts });
  // }),

  // on(loadInspectionChecklistSuccessAction, (state, action) => {
  //   return ({ ...adapter.addAll(action.items, state) })
  // }),
  // on(clearAllSelectedTerms, (state) => {
  //   return Object.assign({}, state, { selectedTerms: null });
  // }),
  // on(removeAllChecklistProductsAction, (state) => {
  //   return Object.assign({}, state, { checklistProducts: null });
  // }),
  // on(removeTermFormChecklistAction, (state, action) => {
  //   /* when the product is deselected we want to remove also the selected terms using the product id */
  //   let selectedTerms = Object.assign([], state.selectedTerms);
  //   action.ids && action.ids.length > 0 && action.ids.forEach(id => {
  //     const index: number = selectedTerms.indexOf(id);
  //     if (index !== -1) {
  //       selectedTerms.splice(index, 1);
  //     }
  //   });

  //   return Object.assign({}, state, { selectedTerms });
  // }),

  // on(highlightChecklistAction, (state, action) => {
  //   return Object.assign({}, state, { isHighlighting: action.highlight });
  // }),
  // on(addToChecklistSuccessAction, (state, action) => {
  //   return adapter.addOne(action.item, state)
  // }),
  // /* if when adding a checklist item and no source is set, then add the newly created item as a source */
  // on(addToChecklistSuccessAction, (state, action) => {
  //   let checklistSource: IContractChecklistItem = state.checklistSource;
  //   if (state && !checklistSource && action.item) {
  //     checklistSource = action.item;
  //   }
  //   return Object.assign({}, state, { checklistSource });
  // })
);
export function ContractChecklistReducer(state: ContractChecklistState, action: Action) {
  return reducer(state, action);
}
