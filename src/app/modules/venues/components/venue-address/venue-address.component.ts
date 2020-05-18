import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { IVenue } from './../../venues.models';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-venue-address',
  templateUrl: './venue-address.component.html',
  styleUrls: ['./venue-address.component.scss']
})

export class VenueAddressComponent extends GenericRowComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public items: IVenue[];
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  @Input()
  public colsHeaders: Array<{ label: string, width?: string | number }>;
  public rates = new Array(5);

  public dragStart: boolean = false;
  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  constructor() {
    super();
  }

  ngOnInit() { }

  public dragStarted(event: any) {
    this.dragStart = event;
  }

  public onClickPnl(pnl: any, event: any, i: number): void {
    event.preventDefault();
    const classList = event.currentTarget.classList;
    this.selectedIndex = null;
    if (classList.contains('menu-icon') || classList.contains('no-expand')) {
      pnl.close();
      this.selectedIndex = i;
    }
  }
}
