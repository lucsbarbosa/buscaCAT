import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CatAPIService } from '../../services/cat-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  cats: any[];
  index: number;

  cardsWidth!: number;

  @ViewChild('cards') ref!: ElementRef;

  constructor(private catAPI: CatAPIService) {
    this.cats = [];
    this.index = 0;
  }

  ngOnInit(): void {
    this.loadCats();
  }

  ngAfterViewInit(): void {
    this.cardsWidth = this.ref.nativeElement.offsetWidth;
  }

  loadCats() {
    this.catAPI.getCats().subscribe((cats) => {
      this.cats.push(...cats);
    });
  }

  goForward() {
    const newIndex = (this.index += 1);
    newIndex == Math.ceil(this.cats.length / 2) ? this.loadCats() : null;
    this.ref.nativeElement.style.transform = `translateX(-${
      (this.cardsWidth + 16) * this.index
    }px)`;
  }

  goBack() {
    let newIndex: number = (this.index -= 1);
    if (newIndex < 0) {
      this.index = 0;
      return;
    }
    this.index = newIndex;
    this.ref.nativeElement.style.transform = `translateX(-${
      (this.cardsWidth + 16) * this.index
    }px)`;
  }
}
