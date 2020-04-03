import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ErrorModalComponent } from "./modules/shared/modals/error-modal/error-modal.component";

/**
 * Intercepts outgoing requests and checks their status. If they fail,
 * it launches a modal informing of the error.
 */
@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private modalService: NgbModal) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorStatus = "";
        let errorMessage = "";

        // prepare modal msg depending from where the error comes
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = error.error.message;
        } else {
          // server-side error
          errorStatus = `${error.status} - `;
          errorMessage = error.message;
        }

        // launchs modal with an expanding animation
        const modalRef = this.modalService.open(ErrorModalComponent, {
          ariaLabelledBy: "modal-basic-title",
          centered: true,
          size: "md",
          windowClass: "modal-holder"
        });

        // set contents of the modal
        modalRef.componentInstance.message = errorMessage;
        modalRef.componentInstance.status = errorStatus;

        // console.log({
        //   errorMessage: errorMessage,
        //   errorStatus: errorStatus
        // });

        return throwError(errorMessage);
      })
    );
  }
}
