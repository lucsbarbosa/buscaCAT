import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from 'src/app/shared/services/ui.service';
import { CatAPIService } from '../../services/cat-api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnChanges {
  @Input() catData!: any;
  @Input() id!: number;
  @Input() fromCatPage: boolean;

  favourited: boolean;
  clicked: boolean;
  imgLoaded: boolean;

  @Output() catFavourited = new EventEmitter<string>();

  constructor(
    private catAPI: CatAPIService,
    private uiService: UiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.favourited = false;
    this.fromCatPage = false;
    this.clicked = false;
    this.imgLoaded = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fromCatPage ? (this.favourited = true) : (this.favourited = false);
  }

  handleFavourite() {
    this.clicked = true;
    this.catAPI
      .postFavorite(this.catData.id, this.uiService.getFav())
      .subscribe((response) => {
        if (response.message == 'SUCCESS') {
          this.catFavourited.emit(this.catData.id);
          this.id = response.id;
          this.favourited = true;
        } else {
            // lançar toast
        }
        this.clicked = false;
      });
  }

  handleUnfavourite() {
    this.clicked = true;
    this.catAPI
      .deleteFavorite(this.id, this.uiService.getFav())
      .subscribe((response) => {
        if (response.message == 'SUCCESS') {
          this.router.navigate(['../../favourites'], {
            relativeTo: this.route,
          });
        } else {
          // ad
        }
        this.clicked = false;
      });
  }
}
