import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  faUser,
  faPlus,
  faChevronRight,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";

import { ApiService } from "../services/api.service";
import { User } from "../models/user";

@Component({
  selector: "app-user-new",
  templateUrl: "./user-new.component.html",
  styleUrls: ["./user-new.component.scss"]
})
export class UserNewComponent implements OnInit {
  // attributes
  newUserForm: FormGroup;
  newUser: User;
  now: string;
  // icons
  faUser = faUser;
  faPlus = faPlus;
  faChevronRight = faChevronRight;
  faCalendarAlt = faCalendarAlt;

  constructor(private apiService: ApiService) {
    this.newUser = {
      id: null,
      name: null,
      birthdate: null
    };

    this.now = (new Date()).toISOString();
  }

  ngOnInit(): void {
    this.newUserForm = new FormGroup({
      name: new FormControl(this.newUser.name, [
        Validators.required
      ]),
      birthdate: new FormControl(this.newUser.name, [
        Validators.required
      ])
    });
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
