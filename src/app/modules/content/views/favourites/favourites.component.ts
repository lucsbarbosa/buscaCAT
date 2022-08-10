import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/shared/services/ui.service';
import { CatAPIService } from '../../services/cat-api.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.sass'],
})
export class FavouritesComponent implements OnInit {
  cats: any[];
  index: number;
  loading: boolean;

  constructor(private catAPI: CatAPIService, private uiService: UiService) {
    this.cats = [[], [], [], []];
    this.index = 0;
    this.loading = true;
  }

  ngOnInit(): void {
    this.catAPI.getUserFavs(this.uiService.getFav()).subscribe((favourites) => {
      favourites.forEach((favourite: any) => {
        this.cats[this.index].push(favourite)
        this.index + 1 < this.cats.length ? this.index += 1 : this.index = 0;
      });
      this.loading = false;
      console.log(favourites)
    });
  }
}
