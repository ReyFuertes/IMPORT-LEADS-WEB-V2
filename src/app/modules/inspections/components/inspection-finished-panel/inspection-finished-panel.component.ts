import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { ISimpleItem, Menu } from './../../../../shared/generics/generic.model';
import { IActiveInspection, InspectionPanelModel } from './../../inspections.models';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { takeUntil } from 'rxjs/operators';
import { getFinishedInspectionsSelector } from '../../store/selectors/inspection.selector';

@Component({
  selector: 'il-inspection-finished-panel',
  templateUrl: './inspection-finished-panel.component.html',
  styleUrls: ['./inspection-finished-panel.component.scss']
})
export class InspectionFinishedPanelComponent extends GenericRowComponent implements OnInit, AfterViewInit {
  public apiImagePath: string = environment.apiImagePath;
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public menus: Menu[];

  @Input() public colsHeader: Array<{ label: string, width?: any }>;
  @Input() public items: InspectionPanelModel[];
  @Input() public finishedInspections: IActiveInspection[];
  @Input() public isCategory: boolean = false;

  constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef, private router: Router) {
    super();
  }

  public dragStart: boolean = false;
  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  ngOnInit() {
    this.store.pipe(select(getFinishedInspectionsSelector),
      takeUntil(this.$unsubscribe)).subscribe((res) => {
        if (res) this.finishedInspections = res;
      });

    this.menus = [
      {
        label: 'REPORT',
        value: 'REPORT',
        icon: 'inspection-icon-black.svg',
        action: (item) => {
          this.router.navigateByUrl(`/dashboard/inspections/${item?.id}/report`);
        }
      },
      {
        label: 'DELETE',
        value: 'DELETE',
        icon: 'delete-icon-red.svg'
      }
    ];
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  public dragStarted(event: any): void {
    this.dragStart = event;
  }

  public onEdit = (): void => {
    this.router.navigateByUrl('/dashboard/inspections/run-template');
  }

  public onOpenReport = (): void => {
    this.router.navigateByUrl('/dashboard/inspections/report');
  }

  public expandPnl(pnl: any, event: any, i: number): void {
    event.preventDefault();
    const classList = event.target.parentNode.classList;
    if (classList.contains('action-col')) {
      pnl.close();
    }
  }

}
