import { highlightChecklistAction } from './../../store/actions/contract-checklist.action';
import { AppState } from './../../../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { ISimpleItem } from './../../../../shared/generics/generic.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BriefDialogComponent } from './../../../dialogs/components/brief/brief-dialog.component';
import { AQLDialogComponent } from './../../../dialogs/components/aql/aql-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISavedChecklist } from '../../contract.model';
import { getAllSavedChecklistSelector } from '../../store/selectors/saved-checklist.selector';

@Component({
  selector: 'il-contract-right-content',
  templateUrl: './contract-right-content.component.html',
  styleUrls: ['./contract-right-content.component.scss']
})

export class ContractRightContentComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public assignments: ISimpleItem[] = [{
    label: 'Rey Fuertes',
    value: '1'
  },
  {
    label: 'Juan dela Cruz',
    value: '2'
  },
  {
    label: 'Ben Booterkooper',
    value: '3'
  }];
  public $savedChecklist: Observable<ISavedChecklist[]>;

  @Input() public form: FormGroup;
  @Output() public closeEmitter = new EventEmitter<boolean>();
  @ViewChild('scrollPnl', { static: true }) public scrollPnl: any;

  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    this.$savedChecklist = this.store.pipe(select(getAllSavedChecklistSelector));
  }

  ngOnInit() { }

  public addBrief(): void {
    const dialogRef = this.dialog.open(BriefDialogComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  public addAql(): void {
    const dialogRef = this.dialog.open(AQLDialogComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => { });
  }
}
