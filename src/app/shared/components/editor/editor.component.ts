import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from './../../../../environments/environment';
import { saveTermImage } from './../../../modules/contracts/store/actions/contract-term.actions';
import { AppState } from './../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';

import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;
import ImageResize from 'quill-image-resize-module';
import { uploadTermImage } from 'src/app/modules/contracts/store/actions/contract-term.actions';
Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'il-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class EditorComponent implements OnInit {
  public imageApiPath: string = environment.apiImagePath;
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

    const filename = `${uuid()}.${this.quillFile.name.split('?')[0].split('.').pop()}`;

    /* upload the image physical file */
    const dataFile = new FormData();
    dataFile.append('file', this.quillFile, filename);
    this.store.dispatch(uploadTermImage({ file: dataFile }));

    /* store the image details to db */
    const imagePayload = {
      image: {
        filename,
        size: this.quillFile.size,
        type: this.quillFile.type,
        term_id: this.entityId
      }
    }
    this.store.dispatch(saveTermImage(imagePayload));

    setTimeout(() => {
      let range = this.meQuillRef.getSelection();
      this.meQuillRef.clipboard.dangerouslyPasteHTML(range.index, `<img src="${this.imageApiPath}${filename}" />`);

      /* update value to form */
      this.form.get(this.controlName).patchValue(this.meQuillRef.root.innerHTML);
    }, 500);
  }

  public customImageUpload(image: any): void {
    this.quillFileRef.nativeElement.click();
  }

  public getMeEditorInstance(editorInstance: any): void {
    this.meQuillRef = editorInstance;
  }

  constructor(public fb: FormBuilder, private store: Store<AppState>) {

  }

  ngOnInit() { }
}
