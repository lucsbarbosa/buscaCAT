import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass'],
})
export class LoadingComponent implements OnInit {
  @Input() text: string;
  constructor() {
    this.text = '';
  }

  ngOnInit(): void {}
}
