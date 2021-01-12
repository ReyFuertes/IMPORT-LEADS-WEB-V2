import { updateContractTermSuccessAction } from './../actions/contract-term.actions';
import { sortByDesc } from 'src/app/shared/util/sort';
import { ContractModuleState } from './index';
import { addContractCategoryActionSuccess, loadContractCategoryActionSuccess, deleteContractCategoryActionSuccess, selTermsForChecklistAction, loadAllContractCategoryActionSuccess } from './../actions/contract-category.action';
import { IContractCategory, IContractCategoryReponse, IContractTerm } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as _ from 'lodash';
import { updateCategorysSuccess } from '../actions/category.action';

export interface ContractCategoryState extends EntityState<IContractCategory> {
  selTermsForChecklist: IContractTerm[];
  contractCategories: IContractCategoryReponse[]
}
export const adapter: EntityAdapter<IContractCategory> = createEntityAdapter<IContractCategory>({});
export const initialState: ContractCategoryState = adapter.getInitialState({
  selTermsForChecklist: null,
  contractCategories: null
});

const reducer = createReducer(
  initialState,
  on(loadAllContractCategoryActionSuccess, (state, action) => {
    return Object.assign({}, state, { contractCategories: action.response });
  }),
  on(updateCategorysSuccess, (state, action) => {
    let entities = Object.values(state.entities);
    entities.forEach(item => {
      if (item.category.id === action.updated.id) {
        item.category = action.updated
      }
    });
    return state
  }),
  on(selTermsForChecklistAction, (state, action) => {
    let terms = Object.assign([], state.selTermsForChecklist);
    /* add/remove terms after toggle */
    if (terms && !terms.includes(action.term)) {
      terms.push(action.term);
    } else {
      _.remove(terms, {
        id: action.term.id
      });
    }
    return Object.assign({}, state, { selTermsForChecklist: terms });
  }),
  on(updateContractTermSuccessAction, (state, action) => {
    let entities = Object.values(state.entities);
    /* update the term detail on inline editing in category tab */
    entities?.forEach(en => {
      en?.terms?.forEach(term => {
        if (term?.id === action?.updated?.id) {
          term = Object.assign({}, term, {
            term_name: action?.updated?.term_name,
            term_description: action?.updated?.term_description
          });
          console.log('updated term', term)
        }
      });
    });
    return state;
  }),
  on(deleteContractCategoryActionSuccess, (state, action) => {
    return ({ ...adapter.removeOne(action.deleted.id, state) })
  }),
  on(addContractCategoryActionSuccess, (state, action) => {
    return ({ ...adapter.addOne(action.created, state) })
  }),
  on(loadContractCategoryActionSuccess, (state, action) => {
    return ({ ...adapter.setAll(action.items, state) })
  })
);
export function ContractCategoryReducer(state: ContractCategoryState, action: Action) {
  return reducer(state, action);
}
// export const getContractCategory = (state: ContractModuleState) => {
//   const contracts: IContractCategory[] = state && state?.contractCategory?.entities ? Object.values(state?.contractCategory.entities) : null;
//   return contracts && contracts?.sort((a: IContractCategory, b: IContractCategory) => sortByDesc(a, b, 'created_at'));
// };
