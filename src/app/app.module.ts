import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PaymentsComponent } from './payments/payments.component';
import {HttpClientModule} from "@angular/common/http";
import {PaymentsService} from "./services/payments.service";
import {DatePipe} from "@angular/common";
import { PaymentStatusPipe } from './pipes/payment-status.pipe';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { PaymentDetailsComponent } from './payments/payment-details/payment-details.component';
import {AppRoutingModule} from "./app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import { CreatePaymentComponent } from './payments/create-payment/create-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentsComponent,
    PaymentDetailsComponent,
    CreatePaymentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [
    PaymentsService,
    DatePipe,
    PaymentStatusPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
