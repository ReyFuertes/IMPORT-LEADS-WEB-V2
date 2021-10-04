import { AppState } from './../../../contracts/store/reducers/index';
import { Store, select } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { Menu } from './../../../../shared/generics/generic.model';
import { IActiveInspection } from './../../inspections.models';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { runInspectionAction, clearLoadAction, deleteInspectionAction, finishInspectionAction } from '../../store/actions/inspection.action';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/modules/dialogs/components/confirmation/confirmation.component';
import { takeUntil } from 'rxjs/operators';
import { INSPECTIONSRUNTEMPLATEROUTE, INSPECTIONSROUTE } from 'src/app/shared/constants/routes';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'il-inspection-active-panel',
  templateUrl: './inspection-active-panel.component.html',
  styleUrls: ['./inspection-active-panel.component.scss']
})
export class InspectionActivePanelComponent extends GenericRowComponent implements OnChanges, AfterViewInit {
  public apiImagePath: string = environment.apiImagePath;
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;

  public menus: Menu[] = [{
    label: 'RUN',
    icon: 'edit-icon-black.svg',
    action: (item) => {
      this.store.dispatch(runInspectionAction({
        payload: {
          saved_checklist: { id: item.id },
          user: item?.user
        }
      }))
    }
  }, {
    label: 'REPORT',
    icon: 'inspection-icon-black.svg',
    action: (item) => {
      this.router.navigateByUrl(`${INSPECTIONSROUTE}/${item?.id}/report`);
    }
  }, {
    label: 'DELETE',
    icon: 'delete-icon-red.svg',
    action: ({ id }) => {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '410px',
        data: { action: 0 }
      });
      dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
        .subscribe(result => {
          if (result) {
            this.store.dispatch(deleteInspectionAction({ id }));
          }
        });
    }
  }, {
    label: 'FINISH',
    icon: 'done.svg',
    action: (item) => {
      if (item)
        this.store.dispatch(finishInspectionAction({ payload: { id: item.id } }))
    }
  }];

  @Input() public colsHeader: Array<{ label: string, width?: any }>;
  @Input() public activeInspections: IActiveInspection[];
  @Input() public isCategory: boolean = false;

  constructor(public translateService: TranslateService, private dialog: MatDialog, private cdRef: ChangeDetectorRef, private store: Store<AppState>, private router: Router) {
    super();
  }

  public dragStart: boolean = false;
  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.activeInspections, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  public onView(id: string): void {
    this.store.dispatch(runInspectionAction({
      payload: {
        saved_checklist: { id }
      }
    }))
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.store.dispatch(clearLoadAction());
  }

  public hideReportIfNoInspectionRun(run: any, menu: any): boolean {
    return (run?.run_count === 0) && menu?.label === 'REPORT' ? true : false;
  }

  public dragStarted(event: any): void {
    this.dragStart = event;
  }

  public onEdit = (): void => {
    this.router.navigateByUrl(INSPECTIONSRUNTEMPLATEROUTE);
  }

  public expandPnl(pnl: any, event: any, i: number): void {
    event.preventDefault();
    const classList = event.target.parentNode.classList;
    if (classList.contains('action-col')) {
      pnl.close();
    }
  }
}
