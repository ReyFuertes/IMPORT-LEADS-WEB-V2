import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserProfile } from '../../users.models';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { getUserProfileSelector } from '../../store/selectors/user-profile.selector';

@Component({
  selector: 'il-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent {
  public username: string = '';
  public $detail: Observable<IUserProfile>;

  constructor(private store: Store<AppState>) {
    this.$detail = this.store.pipe(select(getUserProfileSelector));
  }
}
