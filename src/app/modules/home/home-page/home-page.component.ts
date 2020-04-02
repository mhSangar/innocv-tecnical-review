import { Component, OnInit } from "@angular/core";
import { faUser, faPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { TranslocoService } from "@ngneat/transloco";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {
  faUser = faUser;
  faPlus = faPlus;
  faInfoCircle = faInfoCircle;

  constructor(private service: TranslocoService) {}

  ngOnInit() {}
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
