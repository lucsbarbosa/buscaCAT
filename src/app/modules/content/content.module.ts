import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';
import { DesignModule } from 'src/app/shared/design/design.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { SignAPIService } from 'src/app/shared/services/sign-api.service';
import { CatAPIService } from './services/cat-api.service';
import { CatApiKeyInterceptor } from './services/interceptors/cat-api-key.interceptor';

import { ContentComponent } from './content.component';
import { HomeComponent } from './views/home/home.component';
import { FavouritesComponent } from './views/favourites/favourites.component';

import { PreviewComponent } from './components/preview/preview.component';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';

import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { ToastModule } from 'src/app/shared/components/toast/toast.module';

import { TitleCasePipe } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { FavouriteCatComponent } from './views/favourite-cat/favourite-cat.component';

@NgModule({
  declarations: [
    ContentComponent,
    HeaderComponent,
    CardComponent,
    HomeComponent,
    FavouritesComponent,
    PreviewComponent,
    FavouriteCatComponent,
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    DesignModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    LoadingModule,
    ToastModule
  ],
  providers: [
    TitleCasePipe,
    AuthGuard,
    SignAPIService,
    CatAPIService,
    { provide: HTTP_INTERCEPTORS, useClass: CatApiKeyInterceptor, multi: true },
  ],
})
export class ContentModule {}
