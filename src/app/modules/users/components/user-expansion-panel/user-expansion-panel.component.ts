import { User } from './../../users.models';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { UserAccess } from '../../users.models';
import { DropdownSelect } from './../../../../shared/generics/generic.model';

@Component({
  selector: 'il-user-expansion-panel',
  templateUrl: './user-expansion-panel.component.html',
  styleUrls: ['./user-expansion-panel.component.scss']
})
export class UserExpansionPanelComponent extends GenericRowComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  public selectedRole: ISimpleItem;
  public roles: ISimpleItem[] = [
    {
      value: '1',
      label: 'Admin',
    },
    {
      value: '2',
      label: 'Inspector'
    },
    {
      value: '3',
      label: 'Manager'
    },
  ];
  public access: DropdownSelect[] = [
    {
      id: 1,
      label: 'Contracts'
    },
    {
      id: 2,
      label: 'Inspections'
    },
    {
      id: 3,
      label: 'Executing Inspections'
    },
    {
      id: 4,
      label: 'Data Pages'
    },
    {
      id: 5,
      label: 'Platform Settings'
    },
    {
      id: 6,
      label: 'Chat'
    },
  ];
  public dragStart: boolean = false;

  @Input() public users: User[];
  @Input() public colsHeaders: Array<{ label: string, width?: string | number }>;
  
  constructor() {
    super();
  }

  ngOnInit() {
  }

  public selectedRoleChange(event: any): void {
    this.selectedRole = event;
  }

  public onClickPnl(pnl: any, event: any, i: number): void {
    event.preventDefault();
    if (event.currentTarget.classList.contains('no-expand')) {
      pnl.close();
    }
  }

  public dragStarted(event: any) {
    this.dragStart = event;
  }

  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.users, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  public getAccessString(access: UserAccess[]): string {
    let accessString = '';
    for (const acc of access) {
      accessString = accessString + acc.title + ', ';
    }
    return accessString.replace(/,\s*$/, '');
  }

  public onPreventExpandPanel(event: any): void {
    event.stopPropagation();
  }

}
