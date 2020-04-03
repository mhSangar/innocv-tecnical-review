import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';

// own modules
import { SharedModule } from "../shared/shared.module";
import { PresentationRoutingModule } from './presentation-routing.module';

// components
import { PresentationPageComponent } from './presentation-page/presentation-page.component';

@NgModule({
  imports: [
    CommonModule,
    PresentationRoutingModule,
    FontAwesomeModule,
    TranslocoModule,
    SharedModule
  ],
  declarations: [PresentationPageComponent],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: 'presentation' }
  ]
})
export class PresentationModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/