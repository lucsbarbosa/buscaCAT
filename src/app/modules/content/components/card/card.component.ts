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
  @Input() favourited: boolean;
  @Input() id!: number;
  loading: boolean;

  constructor(private catAPI: CatAPIService, private uiService: UiService) {
    this.loading = true;
    this.favourited = false;
  }

  ngOnInit(): void {}

  handleFavourite() {
    this.catAPI
      .postFavorite(this.catData.id, this.uiService.getFav())
      .subscribe((response) => {
        if (response.message == "SUCCESS") {
          this.id = response.id
          this.favourited = true;
        }
      });
  } 

  handleUnfavourite() {
    this.catAPI.deleteFavorite(this.id, this.uiService.getFav()).subscribe((response) => {
      if (response.message == 'SUCCESS') {
        this.favourited = false
      } 
    });
  }
}
