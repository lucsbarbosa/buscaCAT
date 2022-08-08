import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/shared/services/ui.service';
import { CatAPIService } from '../../services/cat-api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnInit {
  @Input() catData!: any;
  loading: boolean;
  favorited: boolean;
  id!: number;

  constructor(private catAPI: CatAPIService, private uiService: UiService) {
    this.loading = true;
    this.favorited = false;
  }

  ngOnInit(): void {}

  handleFavourite() {
    this.catAPI
      .postFavorite(this.catData.id, this.uiService.getFav())
      .subscribe((response) => {
        if (response.message == "SUCCESS") {
          this.id = response.id
          this.favorited = true;
        }
      });
  } 

  handleUnfavourite() {
    this.catAPI.deleteFavorite(this.id, this.uiService.getFav()).subscribe((response) => {
      if (response.message == 'SUCCESS') {
        this.favorited = false
      } 
    });
  }
}
