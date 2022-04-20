import { GenericContainer } from './../../../shared/generics/generic-container';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../contracts/store/reducers';
import { Store } from '@ngrx/store';
import { loadUserProfileAction } from '../store/actions/user-profile.actions';
import { StorageService } from 'src/app/services/storage.service';
import { loadContractAsOptionAction, loadUserSettingCategoriesWithContractAction, loadUserSettingCategoryTemplateAction } from '../store/actions/user-setting.action';
import { loadContractCategoryTemplateAction } from '../../contracts/store/actions/contract-category-template.action';

@Component({
  selector: 'il-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss']
})

export class UsersContainerComponent extends GenericContainer implements OnInit {
  constructor(private storageSrv: StorageService, private store: Store<AppState>) {
    super();
    const at = JSON.parse(this.storageSrv.get('at')) || null;
    if (at?.user) {
      this.store.dispatch(loadUserProfileAction({ id: at.user.id }));
    }
    this.store.dispatch(loadUserSettingCategoryTemplateAction());
    this.store.dispatch(loadUserSettingCategoriesWithContractAction());
    this.store.dispatch(loadContractAsOptionAction());
    this.store.dispatch(loadContractCategoryTemplateAction())
  }
}
