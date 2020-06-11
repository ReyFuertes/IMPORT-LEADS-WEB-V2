import { AppState } from './../../../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { ISimpleItem } from './../../../../shared/generics/generic.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BriefDialogComponent } from './../../../dialogs/components/brief/brief-dialog.component';
import { AQLDialogComponent } from './../../../dialogs/components/aql/aql-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { getContractChecklistSelector } from '../../store/selectors/contract-checklist.selector';

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

  @Output()
  public closeEmitter = new EventEmitter<boolean>();
  @ViewChild('scrollPnl', { static: true }) public scrollPnl: any;
  public form: FormGroup;

  constructor(private store: Store<AppState>, public dialog: MatDialog, private fb: FormBuilder) {
    this.form = this.fb.group({
      assignedTo: [null],
      designedRunDate: [null]
    });
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
