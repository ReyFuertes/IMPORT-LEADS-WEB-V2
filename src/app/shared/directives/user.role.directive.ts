import { Directive, Input, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { Store, select } from '@ngrx/store';
import { getUserRolesSelector } from 'src/app/store/selectors/app.selector';
import { GenericDestroyPageComponent } from '../generics/generic-destroy-page';

export enum Roles {
  admin = 1,
  manager = 2,
  inspector = 3
}
@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective extends GenericDestroyPageComponent implements OnInit {
  @Input() public appHasRole: string | string[];

  public isVisible = false;
  public roles = Roles;

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    //  We subscribe to the roles$ to know the roles the user has
    this.store.pipe(select(getUserRolesSelector),
      takeUntil(this.$unsubscribe)
    ).subscribe(roles => {
    
      // If he doesn't have any roles, we clear the viewContainerRef
      if (!roles) {
        this.viewContainerRef.clear();
      }
      if (roles) {
        if(this.appHasRole instanceof Array){ /* if role is multiple array */
          this.appHasRole?.forEach(r => {
            if (roles.includes(this.roles[r])) {
              if (!this.isVisible) {
                this.isVisible = true;
                this.viewContainerRef.createEmbeddedView(this.templateRef);
                return;
              }
            } else {
              this.isVisible = false;
              this.viewContainerRef.clear();
            }
          });
        } else {
          if (roles.includes(this.roles[this.appHasRole])) {
            if (!this.isVisible) {
              this.isVisible = true;
              this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
          } else {
            this.isVisible = false;
            this.viewContainerRef.clear();
          }
        }
      }
    });
  }

}
