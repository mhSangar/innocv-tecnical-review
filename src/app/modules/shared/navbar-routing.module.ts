import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavBarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: NavBarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavbarRoutingModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/