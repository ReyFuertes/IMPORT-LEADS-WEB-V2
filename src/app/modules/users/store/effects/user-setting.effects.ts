import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ICategory, ICategoryContract, ICategoryTemplate } from 'src/app/modules/contracts/contract.model';
import { CategoryTemplateService } from 'src/app/modules/contracts/services/category-template.service';
import { ContractCategoryService } from 'src/app/modules/contracts/services/contract-category.service';
import { ContractsService } from 'src/app/modules/contracts/services/contracts.service';
import { deleteContractCategoryErrorAction } from 'src/app/modules/contracts/store/actions/contract-category.action';
import { CategoryService } from 'src/app/services/category.service';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { appNotificationAction } from 'src/app/store/actions/notification.action';
import { IUserSettingsContractResponse } from '../../users.models';
import { associateCategoryTemplateToContractAction, associateCategoryToContractFailedAction, associateTemplateCategoryToContractSuccessAction, deleteUserSettingTemplateCategoryAction, deleteUserSettingTemplateCategorySuccessAction, deleteUserSettingCategoryTemplateAction, deleteUserSettingCategoryTemplateSuccessAction, loadContractAsOptionAction, loadUserSettingCategoryTemplateAction, loadUserSettingCategoryTemplateSuccessAction, loadUserSettingContractByCategoryIdAction, loadUserSettingContractByCategoryIdSuccessAction, loadContractAsOptionSuccessAction, loadUserSettingCategoriesWithContractAction, loadUserSettingCategoriesWithContractSuccessAction } from '../actions/user-setting.action';
import { AppState } from '../reducers';

@Injectable()
export class UserSettingEffects {
  associateCategoryTemplateToContractAction$ = createEffect(() => this.actions$.pipe(
    ofType(associateCategoryTemplateToContractAction),
    switchMap(({ payload }) => this.categoryTemplateService.post(payload, 'associate').pipe(
      map((response: any) => {
        return associateTemplateCategoryToContractSuccessAction({ response });
      }),
      catchError(({ error }) => {
        const { message } = error;
        this.store.dispatch(appNotificationAction({ notification: { error: true, message } }));

        return of(associateCategoryToContractFailedAction({ error: message }))
      })
    ))
  ));

  loadContractAsOptionAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadContractAsOptionAction),
    switchMap(() => this.contractService.getAll('option').pipe(
      map((response: ISimpleItem[]) => {
        return loadContractAsOptionSuccessAction({ response });
      })
    ))
  ));

  loadUserSettingCategoriesWithContractAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadUserSettingCategoriesWithContractAction),
    switchMap(() => this.contractCategoryService.getAll('contract-with-category').pipe(
      map((response: ICategoryContract[]) => {
        return loadUserSettingCategoriesWithContractSuccessAction({ response });
      })
    ))
  ));

  loadUserSettingContractByCategoryIdAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadUserSettingContractByCategoryIdAction),
    switchMap(({ id }) => this.contractCategoryService.getById(id, 'contract/category').pipe(
      map((response: IUserSettingsContractResponse[]) => {
        return loadUserSettingContractByCategoryIdSuccessAction({ response });
      })
    ))
  ));

  deleteUserSettingTemplateCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteUserSettingTemplateCategoryAction),
    switchMap(({ id }) => this.categoryTemplateService.delete(id).pipe(
      map((deleted: ICategory) => {
        return deleteUserSettingTemplateCategorySuccessAction({ deleted });
      }),
      catchError(({ error }) => {
        this.store.dispatch(appNotificationAction({ notification: { error: true, message: error?.message } }));

        return of(deleteContractCategoryErrorAction({ error: error?.message }))
      })
    ))
  ));

  deleteUserSettingCategoryTemplateAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteUserSettingCategoryTemplateAction),
    switchMap(({ id }) => this.categoryTemplateService.delete(id).pipe(
      map((deleted: ICategoryTemplate) => {
        return deleteUserSettingCategoryTemplateSuccessAction({ deleted });
      })
    ))
  ));

  loadUserSettingCategoryTemplateAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadUserSettingCategoryTemplateAction),
    switchMap(() => this.categoryTemplateService.getAll('contract-category').pipe(
      map((response: ICategoryTemplate[]) => {
        return loadUserSettingCategoryTemplateSuccessAction({ response });
      })
    ))
  ));

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private contractService: ContractsService,
    private categoryTemplateService: CategoryTemplateService,
    private categoryService: CategoryService,
    private contractCategoryService: ContractCategoryService) { }
}
