import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  faUser,
  faSave,
  faChevronRight,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ApiService } from "../services/api.service";
import { User } from "../models/user";

import { CorrectProcessModalComponent } from "../../shared/modals/correct-process-modal/correct-process-modal.component";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"]
})
export class UserEditComponent implements OnInit {
  // attributes
  newUserForm: FormGroup;
  newUser: User;
  now: string;
  formSubmitAttempt: boolean;
  // icons
  faUser = faUser;
  faSave = faSave;
  faChevronRight = faChevronRight;
  faCalendarAlt = faCalendarAlt;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private modalService: NgbModal
  ) {
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
        user.id = res.id || 3492;
        this.resetForm();
        this.openCorrectProcessModal(user);

        // once the user is created, we navigate back to user-list
        this.router.navigate(["/user"]);
      });
    }
  }

  openCorrectProcessModal(user: User) {
    const modalRef = this.modalService.open(CorrectProcessModalComponent, {
      ariaLabelledBy: "modal-basic-title",
      centered: true,
      size: "md",
      windowClass: "modal-holder"
    });
    modalRef.componentInstance.process = "userEdited";
    modalRef.componentInstance.name = user.name;
    modalRef.componentInstance.id = user.id;
    modalRef.componentInstance.date = user.birthdate;

    setTimeout(() => {
      modalRef.componentInstance.onClose();
    }, 3000);
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
