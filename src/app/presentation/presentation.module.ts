import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentationRoutingModule } from './presentation-routing.module';
import { PresentationPageComponent } from './presentation-page/presentation-page.component';

@NgModule({
  imports: [
    CommonModule,
    PresentationRoutingModule
  ],
  declarations: [PresentationPageComponent]
})
export class PresentationModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/