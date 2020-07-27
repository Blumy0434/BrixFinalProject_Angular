import { Injectable } from '@angular/core';
import { ITransactionModel } from '../Models/ITRansactionModel.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private http:HttpClient) { }
  createTransaction(transaction:ITransactionModel): Observable<boolean>{
    debugger;
    return this.http.post<boolean>(environment.createTransactionRoute, transaction);
  }
}
