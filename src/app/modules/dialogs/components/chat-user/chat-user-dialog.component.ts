import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'il-chat-user-dialog',
  templateUrl: './chat-user-dialog.component.html',
  styleUrls: ['./chat-user-dialog.component.scss']
})
export class ChatUserDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public form: FormGroup;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ChatUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.form = this.fb.group({
      term: [null]
    });
  }

  ngOnInit() {
  }

}
