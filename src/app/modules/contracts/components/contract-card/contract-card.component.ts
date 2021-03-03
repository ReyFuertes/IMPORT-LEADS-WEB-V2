import { IContract } from './../../contract.model';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { getVenuesSelector } from 'src/app/modules/venues/store/venues.selector';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { IVenue } from 'src/app/modules/venues/venues.models';
import { DomSanitizer } from '@angular/platform-browser';
import { CONTRACTSROUTE } from 'src/app/shared/constants/routes';

@Component({
  selector: 'il-contract-card',
  templateUrl: './contract-card.component.html',
  styleUrls: ['./contract-card.component.scss']
})

export class ContractCardComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public apiImagePath: string = environment.apiImagePath;
  public venues: IVenue[];

  @Input() public contract: IContract;

  constructor(private cdRef: ChangeDetectorRef, private sanitizer: DomSanitizer, private store: Store<AppState>, private router: Router) {
    super();
  }

  ngOnInit() {
    this.store.pipe(select(getVenuesSelector), takeUntil(this.$unsubscribe))
      .subscribe(venues => {
        this.venues = venues.map(vp => {
          return {
            id: vp.id,
            name: vp.name,
            image: vp.image
          }
        });
      });
  }

  public get getVenues(): boolean {
    return this.venues?.length > 0;
  }

  public getVenueImage(contract: IContract): any {
    const venue = this.venues?.filter(v => v.id === contract?.venue?.id)?.shift();
    const imageName = venue?.image?.filename;

    if (!imageName) return this.sanitizer.bypassSecurityTrustStyle(`url(${this.imgPath}no-image-32x32.png)`);

    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.apiImagePath}${imageName})`);
  }

  public gotoDetail(id: string): void {
    this.router.navigateByUrl(`${CONTRACTSROUTE}/${id}/detail`);
  }

  public ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}
