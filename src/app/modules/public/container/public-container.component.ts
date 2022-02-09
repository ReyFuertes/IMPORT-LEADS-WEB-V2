import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { isUserExistForChangePasswordAction } from '../store/public.actions';
@Component({
  selector: 'il-public-container',
  templateUrl: './public-container.component.html'
})
export class PublicContainerComponent implements OnInit {
  public id: string;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.id = this.route.snapshot.paramMap.get('id') || null;
    if (this.id) {
      this.store.dispatch(isUserExistForChangePasswordAction({ id: this.id }));
    }
  }

  ngOnInit(): void { }
}
