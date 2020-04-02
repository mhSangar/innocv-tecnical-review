import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TRANSLOCO_SCOPE, TranslocoModule } from "@ngneat/transloco";

import { SharedModule } from "../shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomePageComponent } from "./home-page/home-page.component";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    TranslocoModule,
    SharedModule
  ],
  declarations: [HomePageComponent],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: 'home' }
  ],
  bootstrap: [HomePageComponent]
})
export class HomeModule {}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
