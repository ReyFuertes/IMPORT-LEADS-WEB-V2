import { ChatUserDialogComponent } from './../../../dialogs/components/chat-user/chat-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';
import { ChatUser } from '../../chat.models';
import { environment } from '../../../../../environments/environment';
import { ChatDetailDialogComponent } from 'src/app/modules/dialogs/components/chat-detail/chat-detail-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'il-chat-user-list',
  templateUrl: './chat-user-list.component.html',
  styleUrls: ['./chat-user-list.component.scss']
})
export class ChatUserListComponent implements OnInit {
  public svgPath: string = environment.imgPath;
  @Input()
  public chatUsers: ChatUser;
  public selectedItem: number = -1;
  constructor(public translateService: TranslateService, public dialog: MatDialog) { }
  ngOnInit() {
  }

  public onEdit(i?: number): void {
    this.selectedItem = i
    const dialogRef = this.dialog.open(ChatUserDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => { });
  }

  public newChat(): void {
    const dialogRef = this.dialog.open(ChatDetailDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => { });
  }
}
