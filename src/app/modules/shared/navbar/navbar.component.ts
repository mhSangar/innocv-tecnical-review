import { Component, OnInit } from "@angular/core";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { TranslocoService } from "@ngneat/transloco";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavBarComponent implements OnInit {
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  locales = [
    { label: "🇬🇧 English (UK)", value: "en" },
    { label: "ES Español", value: "es" }
  ];
  title = "Title"

  constructor(private service: TranslocoService) {
    this.service.selectTranslate('navbar.title').subscribe(value => {
      this.title = value;
    });

  }

  ngOnInit() {}

  updateLang(lang: string) {
    console.log("%c 🍻 Updated language to " + lang, 'color: #e2932d');

    this.service.setActiveLang(lang);
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
