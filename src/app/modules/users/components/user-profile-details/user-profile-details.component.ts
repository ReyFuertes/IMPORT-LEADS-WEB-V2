import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'il-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.scss']
})
export class UserProfileDetailsComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public form: FormGroup;

  public roles: Array<{ id: number, label: string}> = [
    {
      id: 1,
      label: 'Admin'
    },
    {
      id: 2,
      label: 'Inspector'
    },
    {
      id: 3,
      label: 'Manager'
    },
  ];
  constructor(public fb: FormBuilder) {
    this.form = this.fb.group({
      id: [''],
      position: [''],
      role: [null],
      company: [''],
    });
   }

  ngOnInit() {}

  public handleSelectChange(event: any): void {}
}
