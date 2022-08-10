import { Component, OnInit } from '@angular/core';
import { SignAPIService } from 'src/app/shared/services/sign-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UiService } from 'src/app/shared/services/ui.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.sass'],
})
export class SignComponent implements OnInit {
  currentRoute: string;
  signData: FormGroup;
  error: string | boolean;
  loading: boolean;

  constructor(
    private signAPI: SignAPIService,
    private builder: FormBuilder,
    private router: Router,
    private title: Title,
    private uiService: UiService,
    private titleCase: TitleCasePipe
  ) {
    this.error = false;
    this.loading = true;
    this.currentRoute = this.router.url.substring(6);
    this.signData = this.builder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.title.setTitle(
      `BuscaCAT - ${this.titleCase.transform(this.currentRoute)}`
    );
    this.verifyToken();
  }

  handleSubmit() {
    if (this.currentRoute == 'login') {
      this.signAPI
        .getUser(...this.getSignData())
        .subscribe((response) => this.handleFormSuccess(response));
    } else {
      this.signAPI
        .postUser(...this.getSignData())
        .subscribe((response) => this.handleFormSuccess(response));
    }
  }

  private getSignData() {
    return [
      this.signData.get('username')!.value,
      this.signData.get('password')!.value,
    ] as const;
  }

  private handleFormSuccess(response: any): void {
    if (response.error) {
      this.error = response.error;
      return;
    }
    localStorage.setItem('token', response.token!);
    this.uiService.setLogged(this.signData.get('username')!.value);
    this.router.navigate(['../../content']);
  }

  private verifyToken(): void {
    const token = localStorage.getItem('token');
    if (token != null) {
      this.signAPI.getToken(token).subscribe((response) => {
        if (response.error) {
          this.error = response.error;
          return;
        }
        if (response.connected) {
          this.uiService.setLogged(response.favId);
          this.router.navigate(['../../content']);
        }
      });
    } else {
      this.loading = false
    }
  }
}
