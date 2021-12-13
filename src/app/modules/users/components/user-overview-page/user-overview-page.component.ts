import { Component, OnInit } from '@angular/core';
import { User } from '../../users.models';
import { UserAddDialogComponent } from 'src/app/modules/dialogs/components/users/user-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'il-user-overview-page',
  templateUrl: './user-overview-page.component.html',
  styleUrls: ['./user-overview-page.component.scss']
})
export class UserOverviewPageComponent implements OnInit {
  public users: any[] = [{
    id: 1,
    name: 'Jane Doe',
    position: 'CEO',
    role:
    {
      value: '1',
      label: 'Admin'
    },
    company: 'CIL China',
    phone: '+86 10 0000 0000',
    image: 'https://dummyimage.com/28x28/c7c5c7/f5f5f5.png',
    access: [
      {
        id: 1,
        title: 'Contracts'
      },
      {
        id: 2,
        title: 'Inspections'
      },
      {
        id: 3,
        title: 'Executing Inspections'
      },
      {
        id: 4,
        title: 'Data Pages'
      },
      {
        id: 5,
        title: 'Platform Settings'
      },
      {
        id: 6,
        title: 'Chat'
      }
    ]
  },
  {
    id: 2,
    name: 'John Doe',
    position: 'Inspector',
    role:
    {
      value: '2',
      label: 'Inspector'
    },
    company: 'CIL China',
    phone: '+86 10 0000 0000',
    image: 'https://dummyimage.com/28x28/c7c5c7/f5f5f5.png',
    access: [
      {
        id: 1,
        title: 'Contracts'
      },
      {
        id: 2,
        title: 'Inspections'
      },
      {
        id: 6,
        title: 'Chat'
      }
    ]
  },
  {
    id: 3,
    name: 'Koen',
    position: 'Manager',
    role:
    {
      value: '3',
      label: 'Manager'
    },
    company: 'CIL China',
    phone: '+86 10 0000 0000',
    image: 'https://dummyimage.com/28x28/c7c5c7/f5f5f5.png',
    access: [
      {
        id: 1,
        title: 'Contracts'
      },
      {
        id: 2,
        title: 'Inspections'
      },
      {
        id: 4,
        title: 'Data Pages'
      },
      {
        id: 6,
        title: 'Chat'
      }
    ]
  },
  {
    id: 4,
    name: 'Mary Jan',
    position: 'Inspector',
    role:
    {
      value: 2,
      label: 'Inspector'
    },
    company: 'CIL China',
    phone: '+86 10 0000 0000',
    image: 'https://dummyimage.com/28x28/c7c5c7/f5f5f5.png',
    access: [
      {
        id: 2,
        title: 'Inspections'
      },
      {
        id: 6,
        title: 'Chat'
      }
    ]
  },
  {
    id: 5,
    name: 'Tammy Li',
    position: 'Inspector',
    role:
    {
      value: 2,
      label: 'Inspector'
    },
    company: 'CIL China',
    phone: '+86 10 0000 0000',
    image: 'https://dummyimage.com/28x28/c7c5c7/f5f5f5.png',
    access: [
      {
        id: 2,
        title: 'Inspections'
      },
      {
        id: 6,
        title: 'Chat'
      }
    ]
  }
  ];
  public ctColsUsers: Array<{ label: string, width?: any }> = [
    {
      label: 'Name',
      width: 20
    },
    {
      label: 'Position',
      width: 10
    },
    {
      label: 'Role',
      width: 10
    },
    {
      label: 'Company',
      width: 10
    },
    {
      label: 'Phone number',
      width: 17
    },
    {
      label: 'Access',
      width: 30
    },
    {
      label: '',
      width: '35px'
    }
  ];
  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  public onAddUser(): void {
    const dialogRef = this.dialog.open(UserAddDialogComponent, { height: '595px' });
    dialogRef.afterClosed().subscribe(result => { });
  }

}
