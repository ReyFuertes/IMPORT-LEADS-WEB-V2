import { AppState } from 'src/app/store/app.reducer';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IContractCategoryTemplate } from '../../contract.model';
import { deleteContractCategoryTemplateAction, deleteContractCategoryTemplateSuccessAction, loadContractCategoryTemplateAction, loadContractCategoryTemplateSuccessAction, saveContractCategoryTemplateAction, saveContractCategoryTemplateSuccessAction } from '../actions/contract-category-template.action';
import { ContractCategoryTemplateService } from '../../services/contract-category-template.service';

@Injectable()
export class ContractCategoryTemplateEffect {
  deleteContractCategoryTemplateAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteContractCategoryTemplateAction),
    switchMap(({ id, category_template_id, contract_category_id, contract_id }) =>
      this.contractCategoryTemplateService.delete(id, `${category_template_id}/${contract_category_id}/${contract_id}`).pipe(
        map((deleted: IContractCategoryTemplate) => {
          return deleteContractCategoryTemplateSuccessAction({ deleted });
        })
      ))
  ));

  loadContractCategoryTemplateAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadContractCategoryTemplateAction),
    switchMap(() => this.contractCategoryTemplateService.getAll().pipe(
      map((response: IContractCategoryTemplate[]) => {
        return loadContractCategoryTemplateSuccessAction({ response });
      })
    ))
  ));

  saveContractCategoryTemplateAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveContractCategoryTemplateAction),
    switchMap(({ payload }) => this.contractCategoryTemplateService.post(payload).pipe(
      map((response: IContractCategoryTemplate) => {
        return saveContractCategoryTemplateSuccessAction({ response });
      })
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private contractCategoryTemplateService: ContractCategoryTemplateService
  ) { }
}
