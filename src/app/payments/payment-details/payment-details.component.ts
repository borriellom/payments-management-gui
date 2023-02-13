import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Payment} from "../../model/Payment";
import {PaymentsService} from "../../services/payments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {mergeMappings} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file";
import {mergeMap, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit, OnDestroy {

  private destroy = new Subject<void>();
  payment!: Payment;

  constructor(private paymentsService: PaymentsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {

    this.route.params
      .pipe(
        takeUntil(this.destroy),
        mergeMap(params => this.paymentsService.getPayment(params['paymentId']))
      )
      .subscribe((response: Payment) => this.payment = response);

  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  markAsPaid(): void {
    if(confirm('Are you sure you want to mark this payment as paid?')) {
      this.paymentsService.markAsPaid(this.payment.id)
        .subscribe((updatedPayment: Payment) => {
          this.payment.paidDate = updatedPayment.paidDate;
          this.payment.status = updatedPayment.status;
        });
    }
  }

  deletePayment(): void {
    if(confirm('Are you sure you want to delete this payment?')) {
      this.paymentsService.delete(this.payment.id)
        .subscribe(() => {
         this.backToPayments();
        });
    }
  }

  isPaid(): boolean {
    return this.payment?.status === 'PAYED';
  }

  backToPayments() {
    this.router.navigateByUrl('/payments');
  }
}
