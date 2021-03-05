import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
@Component({
  selector: 'il-upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.scss']
})

export class UploadBoxComponent implements OnInit, AfterViewInit {
  public svgPath: string = environment.svgPath;
  public files: NgxFileDropEntry[] = [];

  @Input() public label: string = 'Drop Image Here..';
  @Input() public disabled: boolean = false;
  @Output() public imageEmitter = new EventEmitter<File>();

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.imageEmitter.emit(file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }
  public upload = ($event): void => this.imageEmitter.emit($event.target.files[0]);

  public fileOver(event) { }

  public fileLeave(event) { }
}
