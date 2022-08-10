import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './content.component';
import { FavouritesComponent } from './views/favourites/favourites.component';
import { FavouriteCatComponent } from './views/favourite-cat/favourite-cat.component';
import { HomeComponent } from './views/home/home.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: ContentComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'favouriteCat/:id', component: FavouriteCatComponent},
      {path: 'favourites', component: FavouritesComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ContentRoutingModule {}
