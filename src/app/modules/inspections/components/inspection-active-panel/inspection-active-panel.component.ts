import { AppState } from './../../../contracts/store/reducers/index';
import { Store, select } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { Menu } from './../../../../shared/generics/generic.model';
import { IActiveInspection } from './../../inspections.models';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';

@Component({
  selector: 'il-inspection-active-panel',
  templateUrl: './inspection-active-panel.component.html',
  styleUrls: ['./inspection-active-panel.component.scss']
})
export class InspectionActivePanelComponent extends GenericRowComponent implements OnInit {
  public apiImagePath: string = environment.apiImagePath;
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public menus: Menu[];

  @Input() public colsHeaders: Array<{ label: string, width?: string | number }>;

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

  ngOnInit() {
    this.menus = [{
      label: 'RUN',
      value: 'RUN',
      icon: 'edit-icon-black.svg',
      action: () => {
        this.router.navigateByUrl('/dashboard/inspections/run-template')
      }
    }, {
      label: 'REPORT',
      value: 'REPORT',
      icon: 'inspection-icon-black.svg',
      action: this.onOpenReport
    }, {
      label: 'DELETE',
      value: 'DELETE',
      icon: 'delete-icon-red.svg'
    }];

    setTimeout(() => {
      console.log(this.activeInspections)
    }, 1000);
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
