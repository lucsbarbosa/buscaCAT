import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UiService } from 'src/app/shared/services/ui.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private uiService: UiService, private router: Router) {}
  canActivate(): boolean {
    if (this.uiService.isLogged() ) {
      return true;
    } else {
      this.router.navigate(['../sign']);
      return false;
    }
  }
}
