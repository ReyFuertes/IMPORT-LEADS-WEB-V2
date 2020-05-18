import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'il-chat-detail-dialog',
  templateUrl: './chat-detail-dialog.component.html',
  styleUrls: ['./chat-detail-dialog.component.scss']
})
export class ChatDetailDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public form: FormGroup;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ChatDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.form = this.fb.group({
      subject: [null],
      contractName: [null],
      template: [null]
    });
  }

  ngOnInit() {
  }

}
