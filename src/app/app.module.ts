import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";

// transloco
import { translocoLoader } from "./transloco.loader";
import {
  TranslocoModule,
  TRANSLOCO_CONFIG,
  TranslocoConfig
} from "@ngneat/transloco";

// locales
import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es";
import localeGb from "@angular/common/locales/en-GB";

// own modules
import { SharedModule } from "./modules/shared/shared.module";

// components
import { AppComponent } from "./app.component";

registerLocaleData(localeEs, "es");
registerLocaleData(localeGb, "en-GB");

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TranslocoModule,
    SharedModule
  ],
  declarations: [AppComponent],
  providers: [{
      provide: TRANSLOCO_CONFIG,
      useValue: {
        listenToLangChange: true,
        defaultLang: 'en',
        fallbackLang: 'en',
        prodMode: false
      } as TranslocoConfig
    },
    translocoLoader
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
