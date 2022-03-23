import { getContractById, getCachedImages, isAddingOrUpdatingSelector } from '../../../contracts/store/selectors/contracts.selector';
import { getVenuesSelector } from '../../../venues/store/venues.selector';
import { ISimpleItem } from '../../../../shared/generics/generic.model';
import { take, map, takeUntil } from 'rxjs/operators';
import { AppState } from '../../../../store/app.reducer';
import { AddEditDialogState } from '../../../../shared/generics/generic.model';
import { GenericAddEditComponent } from '../../../../shared/generics/generic-ae';
import { IContract, IProductImage } from '../../../contracts/contract.model';
import { environment } from '../../../../../environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AddEditState } from 'src/app/shared/generics/generic.model';
import { Store, select } from '@ngrx/store';
import { addContractAction, uploadContractImagesAction, cacheImagesAction, updateContractAction } from 'src/app/modules/contracts/store/actions/contracts.action';
import { v4 as uuid } from 'uuid';
import { ActivatedRoute } from '@angular/router';
import { convertBlobToBase64 } from 'src/app/shared/util/convert-to-blob';
import * as _ from 'lodash';
import { StorageService } from 'src/app/services/storage.service';
import { getUserClientsSelector, getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'il-contract-add-dialog',
  templateUrl: './contract-add-dialog.component.html',
  styleUrls: ['./contract-add-dialog.component.scss']
})

export class ContractAddDialogComponent extends GenericAddEditComponent<IContract> implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public venues: ISimpleItem[];
  public modalTitle: string = 'Add';
  public images: IProductImage[] = [];
  public cachedImages: IProductImage[] = [];
  public files: File[] = [];
  public apiContractsImagePath: string = environment.apiContractsImagePath;
  public AddEditState = AddEditState;
  public $userClients: Observable<ISimpleItem[]>;

  constructor(private cdRef: ChangeDetectorRef, public translateService: TranslateService, private storageSrv: StorageService, public fb: FormBuilder, public dialogRef: MatDialogRef<ContractAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddEditDialogState, private store: Store<AppState>, public route: ActivatedRoute) {
    super();

    this.form = this.fb.group({
      id: [null],
      contract_name: [null, Validators.required],
      venue: [null, Validators.required],
      start_date: [null, Validators.required],
      delivery_date: [null, Validators.required],
      details: [null],
      images: [null],
      user_client: [null]
    });

    /* manually mark as valid if has value */
    this.form.get('venue')?.valueChanges
      .pipe(take(1),
        takeUntil(this.$unsubscribe))
      .subscribe(res => {
        if (res) this.form.controls['venue'].setErrors(null);
      })

    this.state = data?.state || null;
    if (this.state === this.AddEditState.Edit && data?.id) {
      this.store.pipe(select(getContractById(data.id)),
        takeUntil(this.$unsubscribe))
        .subscribe(c => this.formToEntity(c));

      this.modalTitle = 'Edit ' + data?.formValues['contract_name'];
    } else this.modalTitle = 'Add '

  }

  private formToEntity(item: IContract): void {
    if (!item) return;

    const { id, contract_name, venue, start_date, delivery_date, details, images, user_client } = item;
    this.form.controls['id'].patchValue(id);
    this.form.controls['contract_name'].patchValue(contract_name);
    this.form.controls['venue'].patchValue(venue?.id);
    this.form.controls['start_date'].patchValue(start_date);
    this.form.controls['delivery_date'].patchValue(delivery_date);
    this.form.controls['details'].patchValue(details);
    this.form.controls['images'].patchValue(images);
    this.form.controls['user_client'].patchValue(user_client);

    this.store.dispatch(cacheImagesAction({ images: Object.assign([], images) }));
  }
  ngOnInit() {
    this.store.pipe(select(getCachedImages),
      takeUntil(this.$unsubscribe))
      .subscribe(result => {
        if (result) this.cachedImages = result;
      });

    this.store.pipe(select(getVenuesSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(venues => {
        this.venues = <ISimpleItem[]>venues.map(venue => Object.assign([],
          { label: venue.name, value: venue.id }));
      });

    this.$userClients = this.store.pipe(select(getUserClientsSelector));
    this.$userClients.subscribe(res => console.log(res))
    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
          this.cdRef.detectChanges();
        }
      });
  }

  public get isUploadDisabled(): boolean {
    return this.cachedImages.length === 4 || this.cachedImages.length > 4;
  }

  public get getContractImages(): IProductImage[] {
    return this.cachedImages.slice(0, 4);
  }

  public get hasImgs(): boolean {
    return this.cachedImages && this.cachedImages.length > 0;
  }

  private cnsFileObj(files: FormData): any {
    return Object.values(this.cachedImages) && this.cachedImages.map(ci => {
      if (ci.file)
        files.append('files', ci.file, ci.filename);
      return { id: ci.id, filename: ci.filename, size: ci.size, mimetype: ci.mimetype, dataImage: ci.image }
    }) || null;
  }

  public save = (item: IContract): void => {
    const files = new FormData();
    const { label, value } = this.venues?.filter(v => v.value === this.form.get('venue').value)[0];

    item.venue = { id: value, name: label };
    item.images = this.cnsFileObj(files);

    this.store.dispatch(uploadContractImagesAction({ files }));

    if (this.state === AddEditState.Add) {
      const locaUser = JSON.parse(this.storageSrv.get('at')) || null;
      if (locaUser) {
        item.user = locaUser.user
      }
 
      this.store.dispatch(addContractAction({ item }));
    } else {
      this.store.dispatch(updateContractAction({ item }));
    }

    this.store.pipe(select(isAddingOrUpdatingSelector),
      takeUntil(this.$unsubscribe)).subscribe(res => {
        if (!res) {
          this.dialogRef.close(true);
        }
      });
  }

  public getBg(base64: string): string {
    return `url(${base64})`;
  }

  public onNoClick = (): void => this.dialogRef.close();
  public drop = (event: CdkDragDrop<any[]>) => moveItemInArray(this.cachedImages || this.form.get('images').value, event.previousIndex, event.currentIndex);

  public onRemoveCachedImage(image: IProductImage): void {
    let images = Object.assign([], this.cachedImages);
    let match = images?.filter(i => i.id === image.id)?.shift();
    if (match) {
      _.remove(images, { id: image.id });
      this.store.dispatch(cacheImagesAction({ images }));
    }
  }
 
  public onImageChange(event: File): void {
    this.files.push(event);

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
      .subscribe((result) => {
        this.store.dispatch(cacheImagesAction({ images: this.cachedImages.concat([result]) }));
      });
  }
}
