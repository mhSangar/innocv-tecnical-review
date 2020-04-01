import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'presentation',
    loadChildren: './presentation/presentation.module#PresentationModule'
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path: '',
    component: AppComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'home'
      },
      {
        path: 'home', loadChildren: './home/home.module#HomeModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/