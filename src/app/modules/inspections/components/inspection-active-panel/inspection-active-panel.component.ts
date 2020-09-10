import { AppState } from './../../../contracts/store/reducers/index';
import { Store, select } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { Menu } from './../../../../shared/generics/generic.model';
import { IActiveInspection } from './../../inspections.models';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { runInspectionAction, clearLoadAction } from '../../store/inspection.action';

@Component({
  selector: 'il-inspection-active-panel',
  templateUrl: './inspection-active-panel.component.html',
  styleUrls: ['./inspection-active-panel.component.scss']
})
export class InspectionActivePanelComponent extends GenericRowComponent implements OnInit, OnChanges {
  public apiImagePath: string = environment.apiImagePath;
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public menus: Menu[] = [{
    label: 'RUN',
    icon: 'edit-icon-black.svg',
    action: (item) => {
      this.store.dispatch(runInspectionAction({
        run: {
          saved_checklist: { id: item.id }
        }
      }))
    }
  }, {
    label: 'REPORT',
    icon: 'inspection-icon-black.svg',
    action: () => this.router.navigateByUrl('/dashboard/inspections/report')
  }, {
    label: 'DELETE',
    icon: 'delete-icon-red.svg'
  }];;

  @Input() public colsHeader: Array<{ label: string, width?: string | number }>;
  @Input() public activeInspections: IActiveInspection[];
  @Input() public isCategory: boolean = false;

  constructor(private store: Store<AppState>, private router: Router) {
    super();
  }

  public dragStart: boolean = false;
  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.activeInspections, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.store.dispatch(clearLoadAction());
  }

  public dragStarted(event: any): void {
    this.dragStart = event;
  }

  public onEdit = (): void => {
    this.router.navigateByUrl('/dashboard/inspections/run-template');
  }

  public expandPnl(pnl: any, event: any, i: number): void {
    event.preventDefault();
    const classList = event.target.parentNode.classList;
    if (classList.contains('action-col')) {
      pnl.close();
    }
  }

}
