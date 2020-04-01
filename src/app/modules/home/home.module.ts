import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { NavBarComponent } from '../shared/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule
  ],
  declarations: [HomePageComponent, NavBarComponent]
})
export class HomeModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/