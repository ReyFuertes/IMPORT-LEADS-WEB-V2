import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'il-user-setting-page',
  templateUrl: './user-setting-page.component.html',
  styleUrls: ['./user-setting-page.component.scss']
})
export class UserSettingPageComponent implements OnInit {
  public activeIndex: number;

  constructor(private storageSrv: StorageService) {
    const selectedIndex = this.storageSrv.get('settingsIndex');
    if (selectedIndex) {
      this.activeIndex = JSON.parse(selectedIndex) || 0;
    }
  }

  ngOnInit() { }

  public handleChange(event: any): void {
    this.storageSrv.set('settingsIndex', JSON.stringify(event?.index));
  }

}
