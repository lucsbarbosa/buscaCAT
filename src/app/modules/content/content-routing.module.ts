import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './content.component';
import { FavouritesComponent } from './views/favourites/favourites.component';
import { HomeComponent } from './views/home/home.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: ContentComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'home/cat/:id', component: HomeComponent},
      {path: 'favourites', component: FavouritesComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ContentRoutingModule {}
