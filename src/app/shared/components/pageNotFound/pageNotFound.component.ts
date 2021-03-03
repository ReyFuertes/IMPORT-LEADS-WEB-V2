import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOGINROUTE } from '../../constants/routes';

@Component({
  selector: 'il-pageNotFound',
  templateUrl: './pageNotFound.component.html',
  styleUrls: ['./pageNotFound.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  public toLoginRoute(): void {
    this.router.navigateByUrl(LOGINROUTE);
  }
}
