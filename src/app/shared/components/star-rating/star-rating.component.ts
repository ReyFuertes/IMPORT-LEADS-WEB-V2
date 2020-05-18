import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'il-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input()
  public rating: number;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {}

  @HostBinding('attr.style')
  public get ratingAsStyle(): any {
    const percentRating = (this.rating / 5) * 100;
    return this.sanitizer.bypassSecurityTrustStyle(`--stars-rating: ${percentRating}%`);
  }
}
