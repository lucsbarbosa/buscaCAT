import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.sass'],
})
export class ToastComponent implements OnInit {
  @Input() text: any;
  @Input() mode: string;

  @Output() closeToast = new EventEmitter<boolean>();

  constructor() {
    this.text = '';
    this.mode = '';
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.closeToast.emit(true);
    }, 5000);
  }
}
