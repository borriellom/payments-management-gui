import {Component, OnDestroy, OnInit} from '@angular/core';
import {Payment} from "../model/Payment";
import {PaymentsService} from "../services/payments.service";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreatePaymentRequest} from "../model/CreatePaymentRequest";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, OnDestroy{

  private destroy = new Subject<void>();

  payments: Payment[] = [];

  // paymentForm = new FormGroup({
  //   payerEmail: new FormControl('', Validators.required),
  //   amount: new FormControl('', Validators.required),
  //   currency: new FormControl('', Validators.required)
  // });

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

  // markAsPaid(payment: Payment): void {
  //   if(confirm('Are you sure you want to mark this payment as paid?')) {
  //     this.paymentsService.markAsPaid(payment.id)
  //       .subscribe((updatedPayment: Payment) => {
  //         payment.paidDate = updatedPayment.paidDate;
  //         payment.status = updatedPayment.status;
  //       });
  //   }
  // }
  //
  // deletePayment(payment: Payment): void {
  //   if(confirm('Are you sure you want to delete this payment?')) {
  //     this.paymentsService.delete(payment.id)
  //       .subscribe(() => {
  //         const index = this.payments.indexOf(payment, 0);
  //         if (index > -1) {
  //           this.payments.splice(index, 1);
  //         }
  //       });
  //   }
  // }

  // onSubmit() {
  //   console.log('submit');
  //   console.log(this.paymentForm);
  //   let request: CreatePaymentRequest = {
  //     payerEmail: String(this.paymentForm.controls.payerEmail.value),
  //     currency: String(this.paymentForm.controls.currency.value),
  //     amount: Number(this.paymentForm.controls.amount.value)
  //   };
  //   this.paymentsService.createPayment(request)
  //     .subscribe((newPayment: Payment) => this.payments.push(newPayment));
  // }
  handleNewPaymentCreated(newPayment: Payment) {
    this.payments.push(newPayment);
  }
}
