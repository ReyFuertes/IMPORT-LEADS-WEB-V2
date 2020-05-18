import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'il-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss']
})

export class QuillEditorComponent implements OnInit {
  @Input()
  public value: string;
  @Output()
  public closeEmitter = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() { }

  defaultModules = {
    toolbar: [
      [{table: true}],
      ['bold', 'italic', 'underline'], // toggled buttons
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [
        { color: [] },
        { background: [] }
      ], // dropdown with defaults from theme
      [{ align: [] }],
      ['link', 'image', 'video'] // link and image, video
    ]
  }
}
