import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { SignAPIService } from 'src/app/shared/services/sign-api.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  url: string;
  error: string | null;

  constructor(
    private router: Router,
    private signAPI: SignAPIService,
    private title: Title,
    private titleCase: TitleCasePipe
  ) {
    this.url = '';
    this.error = null;
  }

  ngOnInit(): void {
    this.updateUrl(this.router);

    this.router.events.subscribe((event) => {
      event instanceof NavigationEnd ? this.updateUrl(event) : null;
    });
  }

  handleLogout() {
    this.signAPI
      .deleteToken(localStorage.getItem('token')!)
      .subscribe((response) => {
        if (response.error) {
          this.error = response.error;
          return;
        }
        localStorage.removeItem('token');
        window.location.reload();
      });
  }

  private updateUrl(ref: any): void {
    const url = ref.url.substring(9);
    this.title.setTitle(`BuscaCAT - ${this.titleCase.transform(url)}`);
    url == 'home' || url.startsWith('favouriteCat')
      ? (this.url = 'favourites')
      : (this.url = 'home');
  }
}
