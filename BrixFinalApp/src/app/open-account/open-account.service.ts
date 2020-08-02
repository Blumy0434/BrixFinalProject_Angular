import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPaginationModel } from '../Models/IPaginationModel.model';
import { Observable } from 'rxjs';
import { ITransactionModel } from '../Models/ITRansactionModel.model';

@Injectable({
    providedIn: 'root'
})
export class OpenAccountService {

    constructor(private http: HttpClient) { }

    sendEmailWithVerificationCode(email: string) {
        {
            this.http.post(`${environment.postToVerifyMail}`, email);
        }
    }
}
