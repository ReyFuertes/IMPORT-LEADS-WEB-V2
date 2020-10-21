import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input } from '@angular/core';
import { InsightVenue } from '../../performance-insights.models';
import { environment } from '../../../../../environments/environment';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';

@Component({
  selector: 'il-performance-insights-venue',
  templateUrl: './performance-insights-venue.component.html',
  styleUrls: ['./performance-insights-venue.component.scss']
})
export class PerformanceInsightsVenueComponent extends GenericRowComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public dragStart: boolean = false;

  @Input() public items: InsightVenue[];
  @Input() public colsHeader: Array<{ label: string, width?: any, icon?: string }>;
 
  constructor() {
    super();
  }

  ngOnInit() {
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }
}
