import { Component, OnInit } from "@angular/core";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { TranslocoService } from "@ngneat/transloco";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavBarComponent implements OnInit {
  // icons
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  
  constructor(private translocoService: TranslocoService) {}

  ngOnInit() {
  }

  /**
   * Change locale/language of transloco service at runtime
   */
  updateLang(lang: string) {
    console.log("%c 🍻 Updated language to " + lang, "color: #e2932d");
    this.translocoService.setActiveLang(lang);
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
