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
  hasFavourite: boolean;

  loading: boolean;
  showToast: boolean;

  cardsWidth!: number;

  constructor(private catAPI: CatAPIService) {
    this.cats = [];
    this.index = 0;
    this.loading = true;
    this.showToast = false;
    this.hasFavourite = false;
  }

  ngOnInit(): void {
    this.loadCats();
  }

  loadCats() {
    this.catAPI.getCats().subscribe((cats) => {
      this.cats.push(...cats);
      this.loading = false;
    });
  }

  goForward() {
    this.index += 1;
    this.index == Math.ceil(this.cats.length / 2) ? this.loadCats() : null;
  }

  goBack() {
    let newIndex: number = (this.index -= 1);
    if (newIndex < 0) {
      this.index = 0;
      return;
    }
    this.index = newIndex;
  }

  handleFavourited(id: string) {
    for (let i = 0; i < this.cats.length; i++) {
      if (this.cats[i].id == id) {
        this.cats.splice(i, 1);
        this.showToast = true
      }
    }
  }
}
