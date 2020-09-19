import { environment } from './../../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalStateType } from 'src/app/models/generic.model';
import { AppState } from 'src/app/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { InspectionChecklistService } from 'src/app/modules/inspections/inspections.service';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { IInspectionChecklistImage } from 'src/app/modules/inspections/inspections.models';
import { convertBlobToBase64 } from 'src/app/shared/util/convert-to-blob';
import { v4 as uuid } from 'uuid';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { addInsChecklistImageAction, removeInsChecklistImageAction } from 'src/app/modules/inspections/store/actions/inspection-checklist.action';
import { getInsChecklistImagesSelector } from 'src/app/modules/inspections/store/selectors/inspection-checklist.selector';

@Component({
  selector: 'il-inspection-comment',
  templateUrl: './inspection-comment-dialog.component.html',
  styleUrls: ['./inspection-comment-dialog.component.scss']
})

export class InspectionCommentDialogComponent extends GenericDestroyPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public cachedImages: IInspectionChecklistImage[] = [];
  public files: File[] = [];


  constructor(private insChecklistSrv: InspectionChecklistService, private store: Store<AppState>, public fb: FormBuilder,
    public dialogRef: MatDialogRef<InspectionCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();

    this.form = this.fb.group({
      id: [null],
      comments: [null, Validators.required],
      images: [null]
    });

    this.store.pipe(select(getInsChecklistImagesSelector),
      takeUntil(this.$unsubscribe),
      tap((res) => {
        if (res) {
          this.cachedImages = res;
          this.form.get('images').patchValue(res);
        }
      })).subscribe();
  }

  public get getInsImages(): IInspectionChecklistImage[] {
    return this.cachedImages.slice(0, 4);
  }

  public getBg(base64: string): string {
    return `url(${base64})`;
  }

  ngOnInit() {
    if (ModalStateType.edit && this.data?.id) {
      this.insChecklistSrv.getById(this.data?.id)
        .pipe(tap((res: any) => {
          const { comment } = res.shift();
          this.form.get('id').patchValue(this.data?.id);
          this.form.get('comments').patchValue(comment);
        }))
        .subscribe();
    }
  }

  /* when you drop an image this gets executed */
  public onImageChange(event: File): void {
    this.files.push(event);
    /* collect all drop images in base64 results */
    convertBlobToBase64(event)
      .pipe(take(1),
        takeUntil(this.$unsubscribe),
        map(b64Result => {
          return {
            id: uuid(),
            image: b64Result,
            filename: `${uuid()}.${event.name.split('?')[0].split('.').pop()}`,
            file: event,
            size: event.size,
            mimetype: event.type
          }
        }))
      .subscribe((image) => {
        this.store.dispatch(addInsChecklistImageAction({ image }));
      });
  }

  public onSave(): void {
    this.dialogRef.close(this.form.value);
  }

  public get hasImgs(): boolean {
    return this.cachedImages && this.cachedImages.length > 0;
  }

  public onRemoveCachedImage(image: IInspectionChecklistImage): void {
    if (image)
      this.store.dispatch(removeInsChecklistImageAction({ image }));
  }
}
