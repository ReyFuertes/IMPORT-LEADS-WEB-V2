import { ContractTermService } from './../../services/contract-term.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { updateContractTermTagAction, updateContractTermTagSuccessAction } from '../actions/contract-term-tag.action';

@Injectable()
export class ContractTermTagEffect {
  updateContractTermTagAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateContractTermTagAction),
    switchMap(({ payload }) => this.contractTermService.patch(payload)
      .pipe(
        map((updated: any) => {
          return updateContractTermTagSuccessAction({ updated });
        })
      ))
  ));

  constructor(
    private actions$: Actions,
    private contractTermService: ContractTermService
  ) { }
}
