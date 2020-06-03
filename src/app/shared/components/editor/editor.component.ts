import { uploadTermImage, removeImageUploadState } from './../../../modules/contracts/store/actions/contracts.action';
import { getUploadImageStateSelector } from './../../../modules/contracts/store/selectors/contracts.selector';
import { take, map } from 'rxjs/operators';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from './../../../../environments/environment';
import { saveTermImageDetail } from './../../../modules/contracts/store/actions/contract-term.actions';
import { AppState } from './../../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';

import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;
import ImageResize from 'quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'il-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class EditorComponent implements OnInit {
  public imageApiPath: string = environment.apiImagePath;
  public filename: string;

  @Input()
  public controlName: string;
  @Input()
  public form: FormGroup;
  @Input()
  public entityId: string;

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
    this.store.dispatch(uploadTermImage({ file: dataFile }));

    /* store the image details*/
    const imagePayload = {
      image: {
        filename: this.filename,
        size: this.quillFile.size,
        type: this.quillFile.type,
        term_id: this.entityId
      }
    }
    this.store.dispatch(saveTermImageDetail(imagePayload));
  }

  public customImageUpload(image: any): void {
    this.quillFileRef.nativeElement.click();
  }

  public getMeEditorInstance(editorInstance: any): void {
    this.meQuillRef = editorInstance;
  }

  constructor(public fb: FormBuilder, private store: Store<AppState>) {

  }

  ngOnInit() {
    this.store.pipe(select(getUploadImageStateSelector)).subscribe(res => {
      if (res && this.meQuillRef) {
        debugger
        /* display to editor */
        let range = this.meQuillRef.getSelection();
        this.meQuillRef.clipboard.dangerouslyPasteHTML(range.index, `<img src="${this.imageApiPath}${this.filename}" />`);

        /* update value to form */
        this.form.get(this.controlName).patchValue(this.meQuillRef.root.innerHTML);

        this.store.dispatch(removeImageUploadState());
      }
    })
  }
}
