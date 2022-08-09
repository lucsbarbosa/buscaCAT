import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  logged: boolean;
  favId: string;
  idArray: any[];

  constructor() {
    this.logged = false;
    this.favId = '';
    this.idArray = []
  }

  isLogged(): boolean { return this.logged };
  getFav(): string { return this.favId };

  setLogged(favId: string): void {
    this.logged = true;
    this.favId = favId;
  }
}
