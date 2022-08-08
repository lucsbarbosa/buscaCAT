import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
})
export class ContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
