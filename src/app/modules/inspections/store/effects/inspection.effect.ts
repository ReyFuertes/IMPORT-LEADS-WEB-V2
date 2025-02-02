import { IActiveInspection, IInspectionRun, RunStatusType } from './../../inspections.models';
import { loadActiveInspectionSuccessAction, runInspectionAction, runInspectionSuccessAction, createInspectionChecklistAction, createInspectionChecklistSuccessAction, loadInspectionRunAction, loadInspectionRunSuccessAction, runNextInspectionAction, runNextInspectionSuccessAction, runPrevInspectionAction, runPrevInspectionSuccessAction, changeInspectionRuntimeStatusAction, changeInspectionRuntimeStatusSuccessAction, deleteAndNavigateToAction, deleteAndNavigateToSuccessAction, copyInspectionAction, copyInspectionSuccessAction, navigateToInspectionAction, navigateToInspectionSuccessAction, navigateToFailed, deleteInspectionAction, deleteInspectionSuccessAction, loadInspectionDetailAction, loadInspectionDetailSuccessAction, finishInspectionSuccessAction, finishInspectionAction, loadFinishInspectionAction, loadFinishInspectionSuccessAction, inspectChecklistRunProductAction, inspectChecklistRunProductSuccessAction, getInspectionWithLastRunProductAction, getInspectionWithLastRunProductSuccessAction, prevExistErrorAction, clearExistErrorAction } from '../actions/inspection.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadSavedChecklistAction } from '../../../contracts/store/actions/saved-checklist.action';
import { InspectionsService, InspectionChecklistRunService, InspectionChecklistCommentService, InspectionRuntimeService } from '../../inspections.service';
import { NavigationEnd, Router } from '@angular/router';
import { AppState } from '../../../contracts/store/reducers';
import { appNotification } from 'src/app/store/actions/notification.action';
import { of } from 'rxjs';
import { SavedChecklistService } from 'src/app/modules/contracts/services/saved-checklist';
import { INSPECTIONSROUTE } from 'src/app/shared/constants/routes';

@Injectable()
export class InspectionEffect {
  inspectChecklistRunProductAction$ = createEffect(() => this.actions$.pipe(
    ofType(inspectChecklistRunProductAction),
    switchMap(({ payload }) => {
      return this.inspectionChecklistRunSrv.post(payload, 'inspect-product').pipe(
        map((response: any) => {

          localStorage.setItem('ic_sel_prod', JSON.stringify({
            value: response?.contract_product?.id,
            _id: payload?.product_id
          }));

          //redirect the inspection to the latest record
          this.router.navigateByUrl(`${INSPECTIONSROUTE}/${response?.id}/run`);

          return inspectChecklistRunProductSuccessAction({ response });
        })
      )
    })
  ))

  loadFinishInspectionAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadFinishInspectionAction),
    switchMap(() => {
      return this.inspectionSrv.getAll('finished').pipe(
        map((response: IActiveInspection[]) => {
          return loadFinishInspectionSuccessAction({ response });
        })
      )
    })
  ))

  finishInspectionAction$ = createEffect(() => this.actions$.pipe(
    ofType(finishInspectionAction),
    switchMap(({ payload }) => {
      return this.inspectionSrv.patch(payload, 'finish').pipe(
        map((response: any) => {

          /* refresh active inspections */
          setTimeout(() => {
            this.store.dispatch(loadSavedChecklistAction({}));
            this.store.dispatch(loadFinishInspectionAction());
          });

          return finishInspectionSuccessAction({ response });
        })
      )
    })
  ));

  navigateToInspectionAction$ = createEffect(() => this.actions$.pipe(
    ofType(navigateToInspectionAction),
    switchMap(({ saved_checklist_id, position }) => {
      return this.inspectionChecklistRunSrv.post({ saved_checklist_id, position }, 'navigate-to').pipe(
        map((response: any) => {

          this.router.navigateByUrl(`${INSPECTIONSROUTE}/${response?.id}/run`);
          this.store.dispatch(loadInspectionRunAction({ id: response?.id }));

          return navigateToInspectionSuccessAction({ response });
        }),
        catchError(() => {
          return of(appNotification({
            notification: { error: true, message: 'Position doesnt exist..' }
          }));
        })
      )
    })
  ));

  copyInspectionAction$ = createEffect(() => this.actions$.pipe(
    ofType(copyInspectionAction),
    switchMap((payload: any) => {
      return this.inspectionChecklistRunSrv.post(payload, 'copy').pipe(
        map((response: any) => {

          localStorage.setItem('ic_sel_prod', JSON.stringify({
            value: payload?.contract_product?.id,
            _id: payload?.product?.id
          }));

          //redirect the inspection to the latest record
          this.router.navigateByUrl(`${INSPECTIONSROUTE}/${response?.id}/run`);

          return copyInspectionSuccessAction({ response });
        })
      )
    })
  ));

  deleteAndNavigateToAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteAndNavigateToAction),
    switchMap(({ id }) => {
      return this.inspectionChecklistRunSrv.post({ id }, 'remove-navigate-to').pipe(
        map((response: any) => {

          this.router.navigateByUrl(`${INSPECTIONSROUTE}/${response?.id}/run`);
          this.store.dispatch(loadInspectionRunAction({ id: response?.id }));

          return deleteAndNavigateToSuccessAction({ response });
        })
      )
    })
  ));

  changeInspectionRuntimeStatusAction$ = createEffect(() => this.actions$.pipe(
    ofType(changeInspectionRuntimeStatusAction),
    switchMap(({ payload, hasRedirect, redirectUrl }) => {
      return this.inspectionRuntimeSrv.post(payload, 'status').pipe(
        map((response: any) => {
          let url: string;
          if (!response) {
            url = INSPECTIONSROUTE;
          } else {
            this.store.dispatch(loadInspectionRunAction({ id: response?.id }));
            
            if (hasRedirect) {
              url = redirectUrl;
            } else {
              url = `${INSPECTIONSROUTE}/${response?.saved_checklist_id}`;
              if (response?.run_status === RunStatusType.stop) {
                url = `${url}/report`;
              } else {
                url = `${url}/run`;
              }
            }
          }
          this.router.navigateByUrl(url);

          return changeInspectionRuntimeStatusSuccessAction({ response });
        })
      )
    })
  ));
  runPrevInspectionAction$ = createEffect(() => this.actions$.pipe(
    ofType(runPrevInspectionAction),
    switchMap(({ payload }) => {
      return this.inspectionChecklistRunSrv.post(payload, 'prev').pipe(
        map((response: any) => {

          if (response?.id) {
            this.router.navigateByUrl(`${INSPECTIONSROUTE}/${response?.id}/run`);
          } else {
            this.store.dispatch(prevExistErrorAction())
          }

          return runPrevInspectionSuccessAction({ response });
        })
      )
    })
  ));
  runNextInspectionAction$ = createEffect(() => this.actions$.pipe(
    ofType(runNextInspectionAction),
    switchMap(({ payload }) => {
      return this.inspectionChecklistRunSrv.post(payload, 'next').pipe(
        map((response: any) => {
          this.router.navigateByUrl(`${INSPECTIONSROUTE}/${response?.id}/run`);

          return runNextInspectionSuccessAction({ response });
        })
      )
    })
  ));

  getInspectionWithLastRunProductAction$ = createEffect(() => this.actions$.pipe(
    ofType(getInspectionWithLastRunProductAction),
    switchMap(({ id }) => {
      return this.inspectionChecklistRunSrv.getById(id, 'last-run-product').pipe(
        map((response: IInspectionRun) => {
          return getInspectionWithLastRunProductSuccessAction({ response });
        })
      )
    })
  ))

  loadInspectionRunAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadInspectionRunAction),
    switchMap(({ id }) => {
      return this.inspectionChecklistRunSrv.getById(id).pipe(
        map((response: IInspectionRun) => {
          return loadInspectionRunSuccessAction({ response });
        })
      )
    })
  ))
  createInspectionChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(createInspectionChecklistAction),
    switchMap(({ payload }) => {
      return this.inspectionChecklistSrv.post(payload).pipe(
        map((response: any) => {
          this.router.navigateByUrl(`${INSPECTIONSROUTE}/${response?.inspection_checklist_run?.id}/run`);

          return createInspectionChecklistSuccessAction({ response });
        })
      )
    })
  ));
  runInspectionAction$ = createEffect(() => this.actions$.pipe(
    ofType(runInspectionAction),
    switchMap(({ payload }) => {
      return this.inspectionChecklistRunSrv.post(payload).pipe(
        map((response: IActiveInspection) => {

          this.router.navigateByUrl(`${INSPECTIONSROUTE}/${response?.id}/run`);
          this.store.dispatch(loadInspectionRunAction({ id: response?.id }));

          return runInspectionSuccessAction({ response });
        }),
        catchError((error) => {
          /* redirect back if error occurs */
          this.router.navigateByUrl(`${INSPECTIONSROUTE}`);

          return of(error?.message);
        })
      )
    })
  ));
  loadSavedChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadSavedChecklistAction),
    switchMap(({ param }) => {
      return this.inspectionSrv.getAll(param)
        .pipe(
          map((response: IActiveInspection[]) => {
            return loadActiveInspectionSuccessAction({ response });
          })
        )
    })
  ))
  loadInspectionDetailAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadInspectionDetailAction),
    switchMap(({ payload }) => {
      return this.inspectionSrv.getAll(payload)
        .pipe(
          map((response: IActiveInspection[]) => {
            return loadInspectionDetailSuccessAction({ response });
          })
        )
    })
  ))
  deleteInspectionAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteInspectionAction),
    switchMap(({ id }) => {
      return this.savedChecklistSrv.delete(id)
        .pipe(
          tap(() => this.store.dispatch(loadSavedChecklistAction({}))),
          map((response: IActiveInspection[]) => {
            return deleteInspectionSuccessAction({ response });
          })
        )
    })
  ))

  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store<AppState>,
    private inspectionSrv: InspectionsService,
    private savedChecklistSrv: SavedChecklistService,
    private inspectionRuntimeSrv: InspectionRuntimeService,
    private inspectionChecklistSrv: InspectionChecklistCommentService,
    private inspectionChecklistRunSrv: InspectionChecklistRunService,
  ) {
  }
}
