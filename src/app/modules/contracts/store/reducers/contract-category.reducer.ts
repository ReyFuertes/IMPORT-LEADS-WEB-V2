import { updateContractTermSuccess } from './../actions/contract-term.actions';
import { sortByDesc } from 'src/app/shared/util/sort';
import { ContractModuleState } from './index';
import { addContractCategoryActionSuccess, loadContractCategoryActionSuccess, deleteContractCategoryActionSuccess, selTermsForChecklistAction } from './../actions/contract-category.action';
import { IContractCategory, IContractTerm } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as _ from 'lodash';

export interface ContractCategoryState extends EntityState<IContractCategory> {
  selTermsForChecklist?: IContractTerm[];
}
export const adapter: EntityAdapter<IContractCategory> = createEntityAdapter<IContractCategory>({});
export const initialState: ContractCategoryState = adapter.getInitialState({
  selTermsForChecklist: null
});

const reducer = createReducer(
  initialState,
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
  on(updateContractTermSuccess, (state, action) => {
    let entities = Object.values(state.entities);
    /* update the term detail on inline editing in category tab */
    entities.forEach(entity => {
      entity && entity.terms.forEach(term => {
        if (term.id === action.updated.id) {
          term.term_name = action.updated.term_name;
          term.term_description = action.updated.term_description;
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
    return ({ ...adapter.addAll(action.items, state) })
  })
);
export function ContractCategoryReducer(state: ContractCategoryState, action: Action) {
  return reducer(state, action);
}
export const getContractCategory = (state: ContractModuleState) => {
  const contracts: IContractCategory[] = state && state.contractCategory.entities ? Object.values(state.contractCategory.entities) : null;
  return contracts && contracts.sort((a: IContractCategory, b: IContractCategory) => sortByDesc(a, b, 'created_at'));
};
