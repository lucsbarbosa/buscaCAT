import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'sign', pathMatch: 'full' },
  {
    path: 'sign',
    loadChildren: () =>
      import('./modules/sign/sign.module').then((m) => m.SignModule),
  },
  {
    path: 'content',
    loadChildren: () =>
      import('./modules/content/content.module').then((m) => m.ContentModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
