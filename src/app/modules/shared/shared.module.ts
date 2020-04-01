import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { NavBarComponent } from "./navbar/navbar.component";

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [NavBarComponent],
  exports: [NavBarComponent]
})
export class SharedModule {}
