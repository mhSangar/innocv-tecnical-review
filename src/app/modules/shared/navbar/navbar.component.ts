import { Component, OnInit } from "@angular/core";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavBarComponent implements OnInit {
  faGithub = faGithub;
  faLinkedin = faLinkedin;

  constructor() {}

  ngOnInit() {}
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
