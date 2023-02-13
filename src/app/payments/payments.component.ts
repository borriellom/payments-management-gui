import {Component, OnDestroy, OnInit} from '@angular/core';
import {Payment} from "../model/Payment";
import {PaymentsService} from "../services/payments.service";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, OnDestroy {

  private destroy = new Subject<void>();

  payments: Payment[] = [];

  constructor(private paymentsService: PaymentsService, private router: Router) {
  }

  ngOnInit(): void {
    this.paymentsService.listPayments().pipe(takeUntil(this.destroy))
      .subscribe((response: Payment[]) => this.payments = response);
  }

  isPaid(payment: Payment): boolean {
    return payment.status === 'PAYED';
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  viewPaymentDetails(payment: Payment): void {
    this.router.navigate(['payments', payment.id]);
  }

  handleNewPaymentCreated(newPayment: Payment) {
    this.payments.push(newPayment);
  }
}
