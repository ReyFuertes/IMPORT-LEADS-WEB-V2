import { GenericContainer } from './../../../shared/generics/generic-container';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../contracts/store/reducers';
import { Store, select } from '@ngrx/store';
import { getContractCategorySelector } from '../../contracts/store/selectors/contract-category.selector';
import { loadUserProfileAction } from '../store/actions/user-profile.actions';

@Component({
  selector: 'il-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss']
})

export class UsersContainerComponent extends GenericContainer implements OnInit {
  constructor(private store: Store<AppState>) {
    super();
    const at = JSON.parse(localStorage.getItem('at')) || null;
    if (at && at.user) {
      this.store.dispatch(loadUserProfileAction({ id: at.user.id }));
    }
  }
}
