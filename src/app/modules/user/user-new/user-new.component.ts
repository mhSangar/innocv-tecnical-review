import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
  formSubmitAttempt: boolean;
  // icons
  faUser = faUser;
  faPlus = faPlus;
  faChevronRight = faChevronRight;
  faCalendarAlt = faCalendarAlt;

  constructor(private apiService: ApiService, public router: Router) {
    this.newUser = {
      id: null,
      name: null,
      birthdate: null
    };

    this.now = new Date().toISOString();
    this.formSubmitAttempt = false;
  }

  ngOnInit(): void {
    this.newUserForm = new FormGroup({
      name: new FormControl(this.newUser.name, [Validators.required]),
      birthdate: new FormControl(this.newUser.birthdate, [Validators.required])
    });
  }

  formatDate(year: string, month: string, day: string) {
    const tmpDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
    return tmpDate.toISOString();
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.newUserForm.valid) {
      const formResult = this.newUserForm.value;
      const user: User = {
        id: null,
        name: formResult.name,
        birthdate: this.formatDate(
          formResult.birthdate.year,
          formResult.birthdate.month,
          formResult.birthdate.day
        )
      };

      console.log({ form: this.newUserForm.value, user: user });

      this.apiService.createUser(user).subscribe(res => {
        this.newUser.id = res.id;
        this.resetForm();

        // once the user is created, we navigate back to user-list
        this.router.navigate(['/user']);
      });
    }
  }

  resetForm() {
    this.newUserForm.reset();
    this.formSubmitAttempt = false;
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
