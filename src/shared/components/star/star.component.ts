import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'star-component',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {

  starWidth : number;
  @Input() rating : any;

  constructor() { }

  ngOnChanges() {
    this.starWidth = this.rating *40/5;
  }

}
