import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  logged: boolean;
  favId: string;

  constructor() {
    this.logged = false;
    this.favId = '';
  }

  isLogged(): boolean { return this.logged };
  getFav(): string { return this.favId };

  // ZERAR INFORMAÇÕES QUANDO DER LOGOUT -- FAZER DEPOIS
  setLogged(favId: string): void {
    this.logged = true;
    this.favId = favId;
  }
}
