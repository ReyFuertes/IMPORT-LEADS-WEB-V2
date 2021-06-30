import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { TranslateService } from '@ngx-translate/core';
import { GenericDestroyPageComponent } from '../../generics/generic-destroy-page';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'il-upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.scss']
})

export class UploadBoxComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit {
  public svgPath: string = environment.svgPath;
  public files: NgxFileDropEntry[] = [];

  @Input() public disabled: boolean = false;
  @Output() public imageEmitter = new EventEmitter<File>();

  constructor(private store: Store<AppState>, public translateService: TranslateService, private cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
        }
      });
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
