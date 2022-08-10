import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UiService } from 'src/app/shared/services/ui.service';
import { CatAPIService } from '../../services/cat-api.service';

@Component({
  selector: 'app-favourite-cat',
  templateUrl: './favourite-cat.component.html',
  styleUrls: ['./favourite-cat.component.sass'],
})
export class FavouriteCatComponent implements OnInit {
  cat: any;
  id!: number;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private catAPI: CatAPIService,
    private uiService: UiService
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.catAPI.getUserFavs(this.uiService.getFav()).subscribe((favourites) => {
      favourites.forEach((cat: any) => {
        if (cat.image_id == id) {
          this.id = cat.id;
          this.catAPI.getCatById(id).subscribe((response) => {
            this.cat = response;
            this.loading = false;
          });
        }
      });
    });
  }
}
