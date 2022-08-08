import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/shared/services/ui.service';
import { CatAPIService } from '../../services/cat-api.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.sass'],
})
export class FavouritesComponent implements OnInit {
  favId: string;
  columns: any[];
  heights: number[];

  constructor(private catAPI: CatAPIService, private uiService: UiService) {
    this.favId = this.uiService.getFav();
    this.columns = [[], [], [], []];
    this.heights = [0, 0, 0, 0];
  }

  ngOnInit(): void {
    this.catAPI.getUserFavs(this.favId).subscribe((favourites) => {
      favourites.forEach((fav: any) => {
        console.log(fav)
        this.catAPI.getCatById(fav.image.id).subscribe((img) => {
          const minHeight = Math.min(...this.heights);
          const index = this.heights.indexOf(minHeight);
          this.columns[index].push(fav);
          this.heights[index] += img.height;
        });
      });
    });
  }
}
