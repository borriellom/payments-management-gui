import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreatePaymentRequest} from "../../model/CreatePaymentRequest";
import {Payment} from "../../model/Payment";
import {PaymentsService} from "../../services/payments.service";

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss']
})
export class CreatePaymentComponent implements OnInit {

  paymentForm = new FormGroup({
    payerEmail: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    currency: new FormControl('', Validators.required)
  });

  @Output()
  paymentCreatedEvent: EventEmitter<Payment> = new EventEmitter<Payment>();

  constructor(private paymentsService: PaymentsService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('submit');
    console.log(this.paymentForm);
    let request: CreatePaymentRequest = {
      payerEmail: String(this.paymentForm.controls.payerEmail.value),
      currency: String(this.paymentForm.controls.currency.value),
      amount: Number(this.paymentForm.controls.amount.value)
    };
    this.paymentsService.createPayment(request)
      .subscribe((newPayment: Payment) => {
        this.paymentCreatedEvent.emit(newPayment)
        this.onClose();
      });
  }

  onClose(): void {
    this.paymentForm.reset();
  }
}
