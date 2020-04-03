import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TranslocoService } from "@ngneat/transloco";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [NgbModalConfig, NgbModal]
})
export class AppComponent implements OnInit {
  // the locales the app supports
  locales = [
    { label: "🇬🇧 English (UK)", value: "en" },
    { label: "ES Español", value: "es" }
  ];
  // the user's locale
  detectedLocale = "";
  // the default locale
  locale = this.locales[0].value;

  constructor(
    private translocoService: TranslocoService,
    private titleService: Title,
    config: NgbModalConfig, private modalService: NgbModal
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.detectLocale();
    this.setTitle();
  }

  setTitle() {
    this.translocoService.selectTranslate("navbar.title").subscribe(title => {
      let newTitle = "🛠️ InnoCV";
      if (title !== "navbar.title") newTitle += " - " + title;
      this.titleService.setTitle(newTitle);
    });
  }

  detectLocale() {
    this.detectedLocale = this.getUsersLocale("en-GB");

    // generate a regex from the locales we support
    const supportedRegex = new RegExp(
      "^" + this.locales.map(l => l.value).join("|^")
    );
    // check if the user's preferred language is supported and if so, use it.
    if (this.detectedLocale.match(supportedRegex)) {
      this.updateLocale(this.detectedLocale);
    }
  }

  getUsersLocale(defaultValue: string): string {
    if (
      typeof window === "undefined" ||
      typeof window.navigator === "undefined"
    ) {
      return defaultValue;
    }
    const wn = window.navigator as any;
    let lang = wn.languages ? wn.languages[0] : defaultValue;
    lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
    return lang.substring(0, 2);
  }

  // change locale/language at runtime
  updateLocale(locale) {
    console.log("%c 🍻 Updated language to " + locale, "color: #e2932d");

    if (this.locales.some(l => l.value === locale)) {
      this.locale = locale;
    }
    const lang = locale.substring(0, 2);

    console.log({ lang: lang });
    this.translocoService.setActiveLang(lang);
  }
}
