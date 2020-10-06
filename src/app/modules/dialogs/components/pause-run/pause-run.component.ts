import { ISimpleItem } from '../../../../shared/generics/generic.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { InspectionRunPageComponent } from 'src/app/modules/inspections/components/inspection-run-page/inspection-run-page.component';
import { IInspectionRun, IInspectionRunItem, RunStatusType } from 'src/app/modules/inspections/inspections.models';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { changeInspectionRuntimeStatusAction } from 'src/app/modules/inspections/store/actions/inspection.action';

@Component({
  selector: 'il-pause-run',
  templateUrl: './pause-run.component.html',
  styleUrls: ['./pause-run.component.scss']
})

export class PauseOrRunDialogComponent {
  public svgPath: string = environment.svgPath;

  constructor(private store: Store<AppState>, public dialogRef: MatDialogRef<PauseOrRunDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { ins: IInspectionRun }) {
  }

  public onStop(): void {
    const payload = {
      id: this.data.ins?.id,
      saved_checklist: this.data.ins?.checklist,
      run_status: RunStatusType.stop
    }
    this.store.dispatch(changeInspectionRuntimeStatusAction({ payload }));
    this.dialogRef.close(true);
  }

  public onPause(): void {
    const payload = {
      id: this.data.ins?.id,
      saved_checklist: this.data.ins?.checklist,
      run_status: RunStatusType.pause
    }
    this.store.dispatch(changeInspectionRuntimeStatusAction({ payload }));
    this.dialogRef.close(true);
  }
}
