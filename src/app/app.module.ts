import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from './modules/shared/shared.module';

import { AppComponent } from "./app.component";

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, SharedModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
