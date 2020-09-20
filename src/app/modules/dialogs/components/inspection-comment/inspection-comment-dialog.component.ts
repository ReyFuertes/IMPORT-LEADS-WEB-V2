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
import { addInsChecklistImageAction, removeInsChecklistImageAction, addInsChecklistImagesAction, saveInsChecklistImageFilesAction, clearInsChecklistImageAction } from 'src/app/modules/inspections/store/actions/inspection-checklist.action';
import { getInsChecklistImagesSelector } from 'src/app/modules/inspections/store/selectors/inspection-checklist.selector';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'il-inspection-comment',
  templateUrl: './inspection-comment-dialog.component.html',
  styleUrls: ['./inspection-comment-dialog.component.scss']
})

export class InspectionCommentDialogComponent extends GenericDestroyPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public cachedImages: IInspectionChecklistImage[] = [];
  public $cachedImages: Observable<IInspectionChecklistImage[]>;
  public files: File[] = [];
  public imgUrl: string = `${environment.apiUrl}contracts/image/`;

  constructor(private insChecklistSrv: InspectionChecklistService, private store: Store<AppState>, public fb: FormBuilder,
    public dialogRef: MatDialogRef<InspectionCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();

    this.form = this.fb.group({
      id: [null],
      comments: [null, Validators.required],
      images: [null]
    });
  }

  public get getInsImages(): IInspectionChecklistImage[] {
    return this.cachedImages.slice(0, 4).filter(i => Boolean(i));
  }

  public getBg(base64: string): string {
    return `url(${base64})`;
  }

  ngOnInit() {
    this.$cachedImages = this.store.pipe(select(getInsChecklistImagesSelector));
    this.$cachedImages.pipe(takeUntil(this.$unsubscribe),
      tap((res) => {
        if (res) {
          this.cachedImages.push(...res);

          this.form.get('images').patchValue(this.cachedImages);
        }
      })).subscribe();

    if (ModalStateType.edit && this.data?.id) {
      this.insChecklistSrv.getById(this.data?.id)
        .pipe(tap((res: any) => {
          if (res) {
            const { comment, images } = res.shift();

            /* clear all the state images first */
            this.store.dispatch(clearInsChecklistImageAction());

            /* add all images to state when edit */
            this.store.dispatch(addInsChecklistImagesAction({ images: images }))

            this.form.get('id').patchValue(this.data?.id);
            this.form.get('comments').patchValue(comment);
          }
        })).subscribe();
    }
  }

  /* when you drop an image this gets executed */
  public onImageChange(event: any): void {

    let file: any
    if (_.isObject(event)) {
      file = event;
    } else {
      file = event.target.files[0];
    }

    this.files.push(file);

    this.files.push(event);
    /* collect all drop images in base64 results */
    convertBlobToBase64(event)
      .pipe(take(1),
        takeUntil(this.$unsubscribe),
        map(b64Result => {
          return {
            id: uuid(),
            image: b64Result,
            filename: `${uuid()}.${file.name.split('?')[0].split('.').pop()}`,
            file: file,
            size: file.size,
            mimetype: file.type
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
