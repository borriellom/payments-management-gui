import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Payment} from "../model/Payment";
import {CreatePaymentRequest} from "../model/CreatePaymentRequest";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private API_URL = '/api/payments';

  constructor(private http: HttpClient) {
  }

  listPayments(): Observable<Payment[]> {

    return this.http.get<Payment[]>(this.API_URL);
  }

  getPayment(id: number): Observable<Payment> {
    return this.http.get<Payment>(this.buildUrl(id));
  }

  markAsPaid(id: number): Observable<Payment> {
    return this.http.patch<Payment>(this.buildUrl(id), null);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.buildUrl(id));
  }

  createPayment(request: CreatePaymentRequest): Observable<Payment> {
    return this.http.post<Payment>(this.API_URL, request);
  }

  private buildUrl(id: number): string {
    return this.API_URL + '/' + id;
  }

}
