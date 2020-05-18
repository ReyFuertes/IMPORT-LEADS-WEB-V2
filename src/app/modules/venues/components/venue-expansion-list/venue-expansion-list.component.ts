import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input } from '@angular/core';
import { IRelatedProduct } from '../../venues.models';

@Component({
  selector: 'il-venue-expansion-list',
  templateUrl: './venue-expansion-list.component.html',
  styleUrls: ['./venue-expansion-list.component.scss']
})

export class VenueExpansionListComponent implements OnInit {
  @Input()
  public items: IRelatedProduct[];
  @Input()
  public colsHeaders: Array<{ label: string, width?: string | number }>;
  constructor() { }

  ngOnInit() { }

  public dragStart: boolean = false;
  public drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  public dragStarted(event: any) {
    this.dragStart = event;
  }
}
