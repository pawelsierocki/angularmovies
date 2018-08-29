import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.css']
})
export class GoBackComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  
  onBack(): void {
    this.router.navigate(['/movies']);
  }
}
