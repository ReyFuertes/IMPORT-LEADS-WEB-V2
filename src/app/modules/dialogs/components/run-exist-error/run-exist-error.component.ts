import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'il-run-exist-error',
  templateUrl: './run-exist-error.component.html',
  styleUrls: ['./run-exist-error.component.scss']
})
export class RunExistErrorDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;

  constructor(public dialogRef: MatDialogRef<RunExistErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void { }
}
