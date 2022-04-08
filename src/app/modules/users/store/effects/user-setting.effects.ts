import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ICategory, ICategoryContract, ICategoryTemplate, IContract } from 'src/app/modules/contracts/contract.model';
import { CategoryTemplateService } from 'src/app/modules/contracts/services/category-template.service';
import { ContractCategoryService } from 'src/app/modules/contracts/services/contract-category.service';
import { ContractsService } from 'src/app/modules/contracts/services/contracts.service';
import { deleteCategoryErrorAction } from 'src/app/modules/contracts/store/actions/contract-category.action';
import { CategoryService } from 'src/app/services/category.service';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { appNotificationAction } from 'src/app/store/actions/notification.action';
import { IUserSettingsContractResponse } from '../../users.models';
import { deleteUserSettingCategoryAction, deleteUserSettingCategorySuccessAction, deleteUserSettingCategoryTemplateAction, deleteUserSettingCategoryTemplateSuccessAction, loadContractAsOptionAction, loadContractAsOptionSuccessAction, loaduserSettingCategoriesWithContractAction, loaduserSettingCategoriesWithContractSuccessAction, loadUserSettingCategoryTemplateAction, loadUserSettingCategoryTemplateSuccessAction, loadUserSettingContractByCategoryIdAction, loadUserSettingContractByCategoryIdSuccessAction } from '../actions/user-setting.action';
import { AppState } from '../reducers';

@Injectable()
export class UserSettingEffects {
  loadContractAsOptionAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadContractAsOptionAction),
    switchMap(() => this.contractService.getAll('option').pipe(
      map((response: ISimpleItem[]) => {
        return loadContractAsOptionSuccessAction({ response });
      })
    ))
  ));

  loaduserSettingCategoriesWithContractAction$ = createEffect(() => this.actions$.pipe(
    ofType(loaduserSettingCategoriesWithContractAction),
    switchMap(() => this.contractCategoryService.getAll('contract-with-category').pipe(
      map((response: ICategoryContract[]) => {
        return loaduserSettingCategoriesWithContractSuccessAction({ response });
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

  deleteUserSettingCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteUserSettingCategoryAction),
    switchMap(({ id }) => this.categoryService.delete(id).pipe(
      map((deleted: ICategory) => {
        return deleteUserSettingCategorySuccessAction({ deleted });
      }),
      catchError(({ error }) => {
        this.store.dispatch(appNotificationAction({ notification: { error: true, message: error?.message } }));

        return of(deleteCategoryErrorAction({ error: error?.message }))
      })
    ))
  ));

  // loaduserSettingCategoryAction$ = createEffect(() => this.actions$.pipe(
  //   ofType(loaduserSettingCategoriesAction),
  //   switchMap(() => this.categoryService.getAll().pipe(
  //     map((response: ICategory[]) => {
  //       return loaduserSettingCategoriesSuccessAction({ response });
  //     })
  //   ))
  // ));

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
    switchMap(() => this.categoryTemplateService.getAll().pipe(
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
