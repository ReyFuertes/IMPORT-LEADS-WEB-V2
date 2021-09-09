import { loadTagsAction } from './../../tags/store/actions/tags.actions';
import { loadContractsAction } from './../store/actions/contracts.action';
import { AppState } from './../../../store/app.reducer';
import { GenericContainer } from './../../../shared/generics/generic-container';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProductsAction } from '../../products/store/products.actions';
import { loadSavedChecklistAction } from '../store/actions/saved-checklist.action';
import { loadAllContractCategoryAction } from '../store/actions/contract-category.action';

@Component({
  selector: 'il-contracts-container',
  templateUrl: './contracts-container.component.html',
  styleUrls: ['./contracts-container.component.scss']
})

export class ContractsContainerComponent extends GenericContainer implements OnInit {
  constructor(private store: Store<AppState>) {
    super();
    this.store.dispatch(loadContractsAction(null));
    this.store.dispatch(loadProductsAction());
    this.store.dispatch(loadTagsAction());
    this.store.dispatch(loadSavedChecklistAction({}));
    //this.store.dispatch(loadAllContractCategoryAction());
  }
}
