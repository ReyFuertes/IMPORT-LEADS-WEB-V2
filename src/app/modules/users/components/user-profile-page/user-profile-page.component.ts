import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {

  public username: string = 'Tammy Li';
  constructor() { }

  ngOnInit() {
  }

}
