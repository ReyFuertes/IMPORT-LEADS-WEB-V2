import { addContractTermSuccessAction, updateContractTermSuccessAction } from './../actions/contract-term.actions';
import { addContractCategoryActionSuccess, loadContractCategoryActionSuccess, deleteContractCategoryActionSuccess, selTermsForChecklistAction, loadAllContractCategoryActionSuccess, deleteContractCategoryErrorAction } from './../actions/contract-category.action';
import { IContractCategory, IContractCategoryReponse, IContractTerm } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as _ from 'lodash';
import { updateCategorysSuccess } from '../actions/category.action';
import { updateContractTermTagSuccessAction } from '../actions/contract-term-tag.action';

export interface ContractCategoryState extends EntityState<IContractCategory> {
  selTermsForChecklist: IContractTerm[];
  contractCategories: IContractCategoryReponse[];
  deleteCategoryErrorMsg: string;
}
export const adapter: EntityAdapter<IContractCategory> = createEntityAdapter<IContractCategory>({});
export const initialState: ContractCategoryState = adapter.getInitialState({
  selTermsForChecklist: null,
  contractCategories: null,
  deleteCategoryErrorMsg: null
});

const reducer = createReducer(
  initialState,
  on(loadAllContractCategoryActionSuccess, (state, action) => {
    return Object.assign({}, state, { contractCategories: action.response });
  }),
  on(updateCategorysSuccess, (state, action) => {
    let entities = Object.assign([], Object.values(state.entities));
    entities.forEach(item => {
      if (item.category.id === action.updated.id) {
        Object.assign({}, item, { category: action.updated })
      }
    });
    return Object.assign({}, state);
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
  on(updateContractTermTagSuccessAction, (state, action) => {
    let _entities = Object.assign([], Object.values(state.entities));

    const entities = _entities.map(en => {
      if (en.id === action.updated.id) {
        return Object.assign({}, en, {
          contract_tag: action.updated.contract_tag
        });
      }
      return en;
    });

    return Object.assign({}, state, { entities });
  }),
  on(addContractTermSuccessAction, (state, action) => {
    let _entities = Object.values(state.entities);

    const entities = _entities?.map(entity => {
      if (entity?.id === action?.created?.contract_category?.id) {
        let terms = Object.assign([], entity?.terms);

        terms.push({
          id: action?.created?.id,
          term_name: action?.created?.term_name,
          term_description: action?.created?.term_description
        });

        entity = Object.assign({}, entity, {
          terms: terms
        });
      }
      return entity;
    });

    return Object.assign({}, state, { entities });
  }),
  on(updateContractTermSuccessAction, (state, action) => {
    let _entities = Object.assign([], Object.values(state.entities));
    
    const match = _entities.find(t => t.terms.find(tg => tg.id === action.updated.id));
    let updatedTerms = match?.terms?.map(term => {
      if (term.id === action.updated.id) {
        return action.updated;
      }
      return term;
    });

    const entities = _entities.map(en => {
      if (en.id === action.updated.contract_category.id) {
        return Object.assign({}, en, {
          terms: updatedTerms
        });
      }
      return en;
    });

    return Object.assign({}, state, { entities });
  }),
  on(deleteContractCategoryErrorAction, (state, action) => {
    return Object.assign({}, state, { deleteCategoryErrorMsg: action?.error?.message });
  }),
  on(deleteContractCategoryActionSuccess, (state, action) => {
    return adapter.removeOne(action?.deleted?.id, state)
  }),
  on(deleteContractCategoryActionSuccess, (state) => {
    return Object.assign({}, state, { deleteCategoryErrorMsg: null });
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