import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from '@angular/common/http';

// transloco
import { translocoLoader } from "./transloco.loader";
import {
  TranslocoModule,
  TRANSLOCO_CONFIG,
  TranslocoConfig
} from "@ngneat/transloco";
import { TranslocoLocaleModule } from "@ngneat/transloco-locale";

// own modules
import { SharedModule } from "./modules/shared/shared.module";

// components
import { AppComponent } from "./app.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TranslocoModule,
    TranslocoLocaleModule.init({
      langToLocaleMapping: {
        en: 'en-GB',
        es: 'es-ES'
      }
    }),
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [AppComponent],
  providers: [{
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: ["en", "es"],
        reRenderOnLangChange: true,
        fallbackLang: "es",
        defaultLang: "en"
      } as TranslocoConfig
    },
    
    translocoLoader
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
