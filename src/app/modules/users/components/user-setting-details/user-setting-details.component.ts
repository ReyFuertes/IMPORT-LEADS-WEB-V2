import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'il-user-setting-details',
  templateUrl: './user-setting-details.component.html',
  styleUrls: ['./user-setting-details.component.scss']
})
export class UserSettingDetailsComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(public fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['John'],
      lastName: ['Doe'],
      phoneNumber: ['+86 10 0000 0000'],
      email: ['john-doe@gmail.com'],
      companyName: ['CIL China'],
      companyAddress: ['Haizhu Qu, Guangzhou Shi, Guangdong Sheng China '],
      cardHolderName: ['John Doe'],
      cardNumber: ['0000 0000 0000 0000'],
      cvv: ['123'],
      password: ['johndoe']
    });
  }

  ngOnInit() {
  }

}
