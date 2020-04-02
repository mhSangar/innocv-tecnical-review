import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TRANSLOCO_SCOPE, TranslocoModule } from "@ngneat/transloco";
import { TranslocoLocaleModule } from "@ngneat/transloco-locale";
import { HttpClientModule } from "@angular/common/http";

import { SharedModule } from "../shared/shared.module";
import { UsersRoutingModule } from "./user-routing.module";
import { UserListComponent } from "./user-list/user-list.component";

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    TranslocoModule,
    TranslocoLocaleModule.init({
      langToLocaleMapping: {
        en: 'en-GB',
        es: 'es-ES'
      }
    }),
    HttpClientModule,
    SharedModule
  ],
  declarations: [UserListComponent],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: "user" }],
  bootstrap: [UserListComponent]
})
export class UserModule {}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
