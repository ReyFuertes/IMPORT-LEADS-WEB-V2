import { OnInit } from '@angular/core';

export class GenericContainer implements OnInit {
  public active: boolean = false;
  ngOnInit() {
    setTimeout(() => this.active = !this.active, 100);
  }
}
