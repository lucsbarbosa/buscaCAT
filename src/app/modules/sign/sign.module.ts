import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignRoutingModule } from './sign-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DesignModule } from 'src/app/shared/design/design.module';

import { SignComponent } from './views/sign.component';

import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { ToastModule } from 'src/app/shared/components/toast/toast.module';

import { SignAPIService } from 'src/app/shared/services/sign-api.service';
import { TitleCasePipe } from '@angular/common';

@NgModule({
  declarations: [
    SignComponent,
  ],
  imports: [
    CommonModule,
    SignRoutingModule,
    ReactiveFormsModule,
    DesignModule,
    HttpClientModule,
    LoadingModule,
    ToastModule,
  ],
  providers: [SignAPIService, TitleCasePipe]
})
export class SignModule { }
