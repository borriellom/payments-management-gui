import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PaymentsComponent} from "./payments/payments.component";
import {PaymentDetailsComponent} from "./payments/payment-details/payment-details.component";

const routes: Routes = [
  // { path: 'payments', component: PaymentsComponent, children: [
  //     {path: ':paymentId', component: PaymentDetailsComponent}
  //   ]},
  { path: 'payments', component: PaymentsComponent},
  {path: 'payments/:paymentId', component: PaymentDetailsComponent}
  // { path: '**', component: PaymentsComponent }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
