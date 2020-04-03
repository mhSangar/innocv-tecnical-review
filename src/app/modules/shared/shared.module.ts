import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TRANSLOCO_SCOPE, TranslocoModule } from "@ngneat/transloco";

import { NavbarRoutingModule } from "./navbar-routing.module";
import { NavBarComponent } from "./navbar/navbar.component";

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    TranslocoModule,
    NavbarRoutingModule
  ],
  declarations: [NavBarComponent],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: "navbar" }],
  exports: [NavBarComponent]
})
export class SharedModule {}
