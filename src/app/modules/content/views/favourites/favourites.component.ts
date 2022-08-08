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
  index: number;

  constructor(private catAPI: CatAPIService, private uiService: UiService) {
    this.favId = this.uiService.getFav();
    this.columns = [[], [], [], []];
    this.heights = [0, 0, 0, 0];
    this.index = 0;
  }

  ngOnInit(): void {
    this.catAPI.getUserFavs(this.favId).subscribe((favourites) => {
      favourites.forEach((fav: any) => {
        this.catAPI.getCatById(fav.image_id).subscribe((response) => {
          const minHeight = Math.min(...this.heights);
          const minHeightIndex = this.heights.indexOf(minHeight);
          this.heights[minHeightIndex] += response.height;
          this.columns[minHeightIndex].push(response);
        });
      });
      console.log(this.columns)
    });
  }
}
