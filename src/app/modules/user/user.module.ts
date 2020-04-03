import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TRANSLOCO_SCOPE, TranslocoModule } from "@ngneat/transloco";
import { TranslocoLocaleModule } from "@ngneat/transloco-locale";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbDatepickerModule, NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";

import { SharedModule } from "../shared/shared.module";
import { UsersRoutingModule } from "./user-routing.module";
import { UserListFilterPipe } from "./pipes/user-list-filter.pipe";

import { UserListComponent } from "./user-list/user-list.component";
import { UserNewComponent } from "./user-new/user-new.component";

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule,
    TranslocoLocaleModule,
    NgbDatepickerModule,
    SharedModule
  ],
  declarations: [UserListComponent, UserListFilterPipe, UserNewComponent],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: "user" }
  ],
  bootstrap: [UserListComponent]
})
export class UserModule {}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
