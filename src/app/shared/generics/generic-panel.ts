import { Output, EventEmitter } from '@angular/core';
export abstract class GenericRowComponent {
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  public modifiedValue: any;
  @Output()
  public modValueEmitter = new EventEmitter<any>();
  @Output()
  public deleteEmitter = new EventEmitter<any>();

  public mouseout(): void {
    if (this.selectedIndex != null) return;

    this.hoveredIndex = null;
    this.selectedIndex = null;
  }

  public mouseover(i: number, colIndctr?: number) {
    if (this.selectedIndex == null)
      this.hoveredIndex = i;
  }

  public onClose(): void {
    setTimeout(() => {
      this.selectedIndex = null;
    }, 100);
  }

  /* for table */
  public onDelete(event: any): void {
    this.deleteEmitter.emit(event);
    this.onClose();
  }
  /* for table */
  public onSave(event: any): void {
    this.modValueEmitter.emit(event);
    this.onClose();
  }

  /* update the object value base on input value */
  public onInput(event: any, element: any, col: any): void {
    setTimeout(() => {
      Object.assign({}, element[col] = event.target.value);
    }, 100);
  };

  public onClickPnl(pnl: any, event: any, i: number, item?: any): void {
    event.preventDefault();
    const classList = event.target.parentNode.classList;
    this.selectedIndex = null;
    if (classList.contains('menu-icon') || classList.contains('no-expand')) {
      pnl.close();
      this.selectedIndex = i;
    }
  }
}
