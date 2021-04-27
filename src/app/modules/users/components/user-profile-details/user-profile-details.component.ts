import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { IUserProfile } from '../../users.models';
import { convertBlobToBase64 } from 'src/app/shared/util/convert-to-blob';
import { take, takeUntil, map } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { v4 as uuid } from 'uuid';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { Store } from '@ngrx/store';
import { uploadProfileImageAction, updateProfileAction } from '../../store/actions/user-profile.actions';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { CONTRACTSROUTE, INSPECTIONSROUTE } from 'src/app/shared/constants/routes';

@Component({
  selector: 'il-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.scss']
})
export class UserProfileDetailsComponent extends GenericDestroyPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public form: FormGroup;
  public roles: ISimpleItem[] = [
    {
      label: 'Admin',
      value: 'admin'
    },
    {
      label: 'Inspector',
      value: 'inspector'
    },
    {
      label: 'Manager',
      value: 'manage'
    },
  ];
  public rawImage: any;
  public apiImageUrl: string = environment.apiImagePath;
  public files: File[] = [];
  public isContactEditMode: boolean = false;
  public isComDetailEditMode: boolean = false;
  public inspectionRoute = CONTRACTSROUTE;

  @Input() public detail: IUserProfile;

  constructor(private store: Store<AppState>, public fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: [null],
      position: [null],
      role: [null],
      company_address: [null],
      company_linkedin: [null],
      company_name: [null],
      email: [null],
      facebook: [null],
      firstname: [null],
      image: [null],
      lastname: [null],
      phone: [null],
      qqid: [null],
      self_intro: [null],
      twitter: [null],
      wechatid: [null]
    });
  }

  ngOnInit() {
    if (this.detail)
      this.form.patchValue(this.detail);
  }

  public updateProfile(): void {
    const payload = this.form.value;
    if (payload) {
      delete payload.image;

      /* update profile data */
      this.store.dispatch(updateProfileAction({ payload }));

      setTimeout(() => {
        this.isContactEditMode = false;
        this.isComDetailEditMode = false;
      }, 100);
    }
  }

  public getImage(image: any): any {
    return this.rawImage ? this.rawImage : (image ? this.apiImageUrl + image : this.imgPath + 'default-profile-pic.png');
  }

  public upload(event: any): void {
    const file = event.target.files[0];

    this.files.push(file);

    /* collect all drop images in base64 results */
    convertBlobToBase64(file)
      .pipe(take(1),
        takeUntil(this.$unsubscribe),
        map(b64Result => {       
          return {
            id: uuid(),
            image: b64Result,
            filename: `${uuid()}.${file.name.split('.').pop()}`,
            file: file,
            size: file.size,
            mimetype: file.type
          }
        }))
      .subscribe((result) => {
        if (result) {
          this.rawImage = result?.image;

          /* upload profile image */
          const dataFile = new FormData();
          dataFile.append('file', file, result.filename);
          this.store.dispatch(uploadProfileImageAction({ file: dataFile }));

          /* update profile data */
          this.store.dispatch(updateProfileAction({
            payload: {
              id: this.detail.id,
              image: result.filename
            }
          }));
        }
      })
  }
}
