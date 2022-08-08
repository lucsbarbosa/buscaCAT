import { Component, OnInit } from '@angular/core';
import { CatAPIService } from '../../services/cat-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  cats: any[];
  index: number;
  currentCat: any;

  constructor(private catAPI: CatAPIService) {
    this.cats = [];
    this.index = 0;
  }

  ngOnInit(): void {
    this.loadCats();
  }

  loadCats() {
    this.catAPI.getCats().subscribe((cats) => {
      this.cats.push(...cats);
      this.index == 0 ? (this.currentCat = this.cats[this.index]) : null;
    });
  }

  goForward() {
    const newIndex = (this.index += 1);
    if (newIndex == Math.ceil(this.cats.length / 2)) {
      this.loadCats();
    }
    this.currentCat = this.cats[newIndex];
    console.log(this.currentCat);
  }

  goBack() {
    let newIndex: number = (this.index -= 1);
    newIndex < 0 ? (this.index = 0) : (this.index = newIndex);
    console.log(this.index);
    this.currentCat = this.cats[this.index];
  }
}
