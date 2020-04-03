import { NgModule } from "@angular/core";
import { BrowserModule, Title } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { translocoLoader } from "./transloco.loader";
import {
  TranslocoModule,
  TRANSLOCO_CONFIG,
  TranslocoConfig
} from "@ngneat/transloco";
import { TranslocoLocaleModule } from "@ngneat/transloco-locale";
import { registerLocaleData } from "@angular/common";
import localeEn from "@angular/common/locales/en";
import localeEs from "@angular/common/locales/es";

// own modules
import { SharedModule } from "./modules/shared/shared.module";

// interceptors
import { ApiErrorInterceptor } from "./api-error.interceptor";

// components
import { AppComponent } from "./app.component";

// modals
import { ErrorModalComponent } from "./modules/shared/modals/error-modal/error-modal.component";
import { CorrectProcessModalComponent } from "./modules/shared/modals/correct-process-modal/correct-process-modal.component";

// register locales on app
registerLocaleData(localeEn, "en-GB");
registerLocaleData(localeEs, "es-ES");

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModalModule,
    TranslocoModule,
    TranslocoLocaleModule.init({
      langToLocaleMapping: {
        en: "en-GB",
        es: "es-ES"
      }
    }),
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [AppComponent, ErrorModalComponent, CorrectProcessModalComponent],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: ["en", "es"],
        reRenderOnLangChange: true,
        fallbackLang: "es",
        defaultLang: "en"
      } as TranslocoConfig
    },
    translocoLoader,
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorModalComponent, CorrectProcessModalComponent]
})
export class AppModule {}
