import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginModel } from './Models/ILoginModel.model';
import { IRegisterModel } from './Models/IRegisterModel.model';
import { IAccountModel } from './Models/IAccountModel.model';
import { environment } from '../environments/environment';



@Injectable({
  providedIn: 'root'
})

export class AppService {
  
  constructor(private http: HttpClient) { }

  login(login: ILoginModel): Observable<string> {
    
    return this.http.post<string>(environment.loginRoute, login);
  }
  
  register(register: IRegisterModel): Observable<boolean> {
    
    return this.http.post<boolean>(environment.registerRoute, register);
  }

  getAccount(accountId: string): Observable<IAccountModel> {    
  debugger;
    return this.http.get<IAccountModel>(`${environment.getAccountRoute}${accountId}`);
  }
  
}
