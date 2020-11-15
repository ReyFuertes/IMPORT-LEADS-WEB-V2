import { uploadTermImageAction, removeImageUploadState } from './../../../modules/contracts/store/actions/contracts.action';
import { getUploadImageStateSelector } from './../../../modules/contracts/store/selectors/contracts.selector';
import { take, map, takeUntil, debounceTime } from 'rxjs/operators';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from './../../../../environments/environment';
import { saveTermImageDetailAction } from './../../../modules/contracts/store/actions/contract-term.actions';
import { AppState } from './../../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';

import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;
import ImageResize from 'quill-image-resize-module';
import { DomSanitizer } from '@angular/platform-browser';
import { convertBlobToBase64 } from '../../util/convert-to-blob';
import { GenericDestroyPageComponent } from '../../generics/generic-destroy-page';
Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'il-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class EditorComponent extends GenericDestroyPageComponent implements OnInit {
  @Input() public controlName: string;
  @Input() public form: FormGroup;
  @Input() public entityId: string;

  public imageApiPath: string = environment.apiImagePath;
  public filename: string;
  public base64: any;

  @ViewChild('quillFile', { static: false }) quillFileRef: ElementRef;
  quillFile: File;
  meQuillRef: any;
  editorModules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ header: 1 }, { header: 2 }],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'image']
      ],
      handlers: {
        image: (image) => this.customImageUpload(image)
      }
    },
    imageResize: true,
  };

  public quillFileSelected(ev: any): void {
    this.quillFile = ev.target.files[0];
    this.filename = `${uuid()}.${this.quillFile.name.split('?')[0].split('.').pop()}`;

    /* save image physical file */
    const dataFile = new FormData();
    dataFile.append('file', this.quillFile, this.filename);
    this.store.dispatch(uploadTermImageAction({ file: dataFile }));

    /* collect all drop images in base64 results */
    convertBlobToBase64(this.quillFile)
      .pipe(take(1),
        takeUntil(this.$unsubscribe),
        map(b64Result => {
          return { id: uuid(), base64: b64Result }
        }))
      .subscribe((data) => {
        
        this.base64 = data?.base64;
        /* store the image details*/
        const imagePayload = {
          image: {
            filename: this.filename,
            size: this.quillFile.size,
            type: this.quillFile.type,
            term_id: this.entityId,
            dataImage: data?.base64
          }
        }
        this.store.dispatch(saveTermImageDetailAction(imagePayload));
      });
  }

  public customImageUpload(image: any): void {
    this.quillFileRef.nativeElement.click();
  }

  public getMeEditorInstance(editorInstance: any): void {
    this.meQuillRef = editorInstance;
  }

  constructor(private sanitizer: DomSanitizer, public fb: FormBuilder, private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.store.pipe(select(getUploadImageStateSelector),
      debounceTime(1000), takeUntil(this.$unsubscribe)).subscribe(res => {
        if (res && this.meQuillRef) {
          
          /* display to editor */
          let range = this.meQuillRef.getSelection();
          /* set a default with for image so it will not ruin the preview */
          this.meQuillRef.clipboard.dangerouslyPasteHTML(range.index, `<img width="300px" src="${this.base64}" />`);

          /* update value to form */
          this.form.get(this.controlName).patchValue((this.meQuillRef.root.innerHTML));

          this.store.dispatch(removeImageUploadState());
        }
      })
  }

  public sanitizeHtml(html: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
