import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPaginationModel } from '../Models/IPaginationModel.model';
import { Observable } from 'rxjs';
import { ISendEmailModel } from '../Models/ISendEmailModel.model';

@Injectable({
    providedIn: 'root'
})
export class OpenAccountService {

    constructor(private http: HttpClient) { }

    sendEmailWithVerificationCode(email: ISendEmailModel): Observable<void> {
        {
            return this.http.post<void>(`${environment.postToVerifyMail}`, email);
        }
    }
}
