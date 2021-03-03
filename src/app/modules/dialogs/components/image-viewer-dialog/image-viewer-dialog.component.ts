import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'il-image-viewer-dialog',
  templateUrl: './image-viewer-dialog.component.html',
  styleUrls: ['./image-viewer-dialog.component.scss']
})
export class ImageViewerDialogComponent {
  public svgPath: string = environment.svgPath;
  constructor(private store: Store<AppState>, public dialogRef: MatDialogRef<ImageViewerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  public get getImagePreview(): string {
    return this.data?.image;
  }
}
