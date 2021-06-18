import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
import { Component, Inject } from '@angular/core';
import { IInspectionRun, RunStatusType } from 'src/app/modules/inspections/inspections.models';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { changeInspectionRuntimeStatusAction } from 'src/app/modules/inspections/store/actions/inspection.action';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'il-pause-run',
  templateUrl: './pause-run.component.html',
  styleUrls: ['./pause-run.component.scss']
})

export class PauseOrRunDialogComponent {
  public svgPath: string = environment.svgPath;
  public redirectUrl: string = '';

  constructor(private router: Router, private store: Store<AppState>, public dialogRef: MatDialogRef<PauseOrRunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ins: IInspectionRun, hasRedirect?: boolean, redirectUrl?: string }) {
  }

  public onStop(): void {
    const payload = {
      id: this.data.ins?.id,
      saved_checklist: this.data.ins?.saved_checklist,
      run_status: RunStatusType.stop
    };

    this.store.dispatch(changeInspectionRuntimeStatusAction({
      payload,
      hasRedirect: this.data?.hasRedirect,
      redirectUrl: this.data?.hasRedirect ? this.data?.redirectUrl : null
    }));
    
    this.dialogRef.close(true);
  }

  public onPause(): void {
    const payload = {
      id: this.data.ins?.id,
      saved_checklist: this.data.ins?.saved_checklist,
      run_status: RunStatusType.pause
    }
    this.store.dispatch(changeInspectionRuntimeStatusAction({ payload }));
    this.dialogRef.close(true);
  }
}
