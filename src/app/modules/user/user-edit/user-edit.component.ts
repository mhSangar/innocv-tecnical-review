import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  faUser,
  faSave,
  faChevronRight,
  faCalendarAlt,
  faUndoAlt
} from "@fortawesome/free-solid-svg-icons";
import { NgbModal, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

// services
import { ApiService } from "../services/api.service";
import { DatepickerFormatService } from "../services/datepicker-format.service";

// models
import { User } from "../models/user";

// modal components
import { CorrectProcessModalComponent } from "../../shared/modals/correct-process-modal/correct-process-modal.component";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"]
})
export class UserEditComponent implements OnInit {
  // params
  userId: number;
  // attributes
  editedUserForm: FormGroup;
  originalUser: User;
  editedUser: User;
  now: Date;
  formSubmitAttempt: boolean;
  minSelectableDate: NgbDateStruct;
  maxSelectableDate: NgbDateStruct;
  // icons
  faUser = faUser;
  faSave = faSave;
  faChevronRight = faChevronRight;
  faCalendarAlt = faCalendarAlt;
  faUndo = faUndoAlt;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private dateFormatService: DatepickerFormatService
  ) {
    // assign userId from params
    const tmpUserId = this.route.snapshot.paramMap.get("id");
    this.userId = parseInt(tmpUserId);

    // set default values for edited form and user
    this.editedUserForm = new FormGroup({});
    this.editedUser = {
      id: null,
      name: null,
      birthdate: null
    };

    // set min/max selectable date on datepicker
    this.now = new Date();
    this.minSelectableDate = {
      year: 1900,
      month: 1,
      day: 1
    };
    this.maxSelectableDate = {
      year: this.now.getFullYear(),
      month: this.now.getMonth() + 1,
      day: this.now.getUTCDate()
    };
  }

  ngOnInit(): void {
    // fetch user by param user id
    this.apiService.getUser(this.userId).subscribe((user: User) => {
      // save a copy of the original item to be able to undo changes
      this.originalUser = JSON.parse(JSON.stringify(user));
      this.editedUser = user;

      this.updateFormValues();
    });

    this.updateFormValues();
  }

  /**
   * Reassigns the editedUser to the form controls
   */
  updateFormValues() {
    this.editedUserForm = new FormGroup({
      name: new FormControl(this.editedUser.name, [Validators.required]),
      birthdate: new FormControl(
        this.dateFormatService.stringToDatepicker(this.editedUser.birthdate),
        [Validators.required]
      )
    });
  }

  onSubmit() {
    if (!this.editedUserForm.valid) return;
    this.formSubmitAttempt = true;

    const formResult = this.editedUserForm.value;
    const user: User = {
      id: this.userId,
      name: formResult.name,
      birthdate: this.dateFormatService.datepickerToString(formResult.birthdate)
    };

    // console.log({ form: this.editedUserForm.value, user: user });

    this.apiService.updateUser(user).subscribe(res => {
      // clean form
      this.resetForm();
      // open pop-up informing the user about the correct operation
      this.openCorrectProcessModal(user);

      // navigate back to user-list
      this.router.navigate(["/user"]);
    });
  }

  /**
   * Callback to reset the user and forn to their initial state
   */
  onUndoChanges() {
    const formOriginalValue = {
      name: this.originalUser.name,
      birthdate: this.dateFormatService.stringToDatepicker(this.originalUser.birthdate)
    };

    this.editedUserForm.setValue(formOriginalValue);
  }


  openCorrectProcessModal(user: User) {
    // open modal
    const modalRef = this.modalService.open(CorrectProcessModalComponent, {
      ariaLabelledBy: "modal-basic-title",
      centered: true,
      size: "md",
      windowClass: "modal-holder"
    });

    // set modal parameters
    modalRef.componentInstance.process = "userEdited";
    modalRef.componentInstance.name = user.name;
    modalRef.componentInstance.id = user.id;
    modalRef.componentInstance.date = user.birthdate;

    // auto-close modal after 4 seconds
    setTimeout(() => {
      modalRef.componentInstance.onClose();
    }, 4000);
  }

  resetForm() {
    this.editedUserForm.reset();
    this.formSubmitAttempt = false;
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
