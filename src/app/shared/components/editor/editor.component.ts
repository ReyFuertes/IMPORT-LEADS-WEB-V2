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

var Clipboard = Quill.import('modules/clipboard')
var Delta = Quill.import('delta')

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
  }

  public customImageUpload(image: any): void {
    this.quillFileRef.nativeElement.click();
  }

  public onContentChanged(event: any): void { }

  public getMeEditorInstance(editorInstance: any): void {
    this.meQuillRef = editorInstance;
  }

  constructor(private sanitizer: DomSanitizer, public fb: FormBuilder, private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.store.pipe(select(getUploadImageStateSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(res => {
        if (res === true && this.meQuillRef) {
          try {
            /* display to editor */
            const range = this.meQuillRef.getSelection();

            /* we need to save an optimize way of terms description */
            this.meQuillRef.clipboard.dangerouslyPasteHTML(range.index, `<img width="300px" src="${this.imageApiPath}${this.filename}" />`);
            this.form.get(this.controlName).patchValue(this.meQuillRef.root.innerHTML);

            /* store the image details*/
            const imagePayload = {
              image: {
                filename: this.filename,
                size: this.quillFile.size,
                type: this.quillFile.type,
                term_id: this.entityId
              }
            }
            this.store.dispatch(saveTermImageDetailAction(imagePayload));

            this.store.dispatch(removeImageUploadState());
          } catch (error) {
            console.log(error?.message)
          }
        }
      })
  }

  public sanitizeHtml(html: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
