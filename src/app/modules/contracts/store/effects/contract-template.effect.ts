import { AppState } from 'src/app/store/app.reducer';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ContractTemplateService } from '../../services/contract-template.service';
import { saveContractTemplateAction, saveContractTemplateSuccessAction, loadContractTemplatesAction, loadContractTemplatesSuccessAction } from '../actions/contract-template.action';
import { IContractTemplatePayload } from '../../contract.model';

@Injectable()
export class ContractTemplateEffect {
  loadContractTemplatesAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadContractTemplatesAction),
    switchMap(() => this.contractTemplateSrv.getAll().pipe(
      map((response: any) => {
        return loadContractTemplatesSuccessAction({ response });
      })
    ))
  ));

  saveContractTemplateAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveContractTemplateAction),
    switchMap(({ payload }) => this.contractTemplateSrv.post(payload).pipe(
      map((response: IContractTemplatePayload) => {
        return saveContractTemplateSuccessAction({ response });
      })
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private contractTemplateSrv: ContractTemplateService
  ) { }
}
