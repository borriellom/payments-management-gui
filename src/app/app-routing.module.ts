import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PaymentsComponent} from "./payments/payments.component";
import {PaymentDetailsComponent} from "./payments/payment-details/payment-details.component";

const routes: Routes = [
  {path: '', redirectTo: 'payments', pathMatch: 'full'},
  {path: 'payments', component: PaymentsComponent},
  {path: 'payments/:paymentId', component: PaymentDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
