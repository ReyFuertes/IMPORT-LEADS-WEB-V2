import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'il-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})

export class ExpansionPanelComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input() public panels: Array<{ title: string, description: string }>;

  public selectedPnl: number | null;
  public hoveredPnl: number | null;
  public isEventDialog: boolean = false;
  
  constructor() { }

  ngOnInit() { }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.panels, event.previousIndex, event.currentIndex);
  }

  public onCollapsePnl(pnl: any): void {
    pnl.expanded = false;
  }

  public cdkDropListDroppedHandler(event: CdkDragDrop<any[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
    this.hoveredPnl = event.currentIndex;
  }

  public expandPanel(pnl: any, event: any): void {
    if (event.target.classList.contains('no-expand')) {
      if (pnl.expanded)
        pnl.close()
      else
        pnl.open();
      return;
    }
    if (this.isEventDialog) {
      pnl.open();
      this.isEventDialog = false;
    }
  }
}
