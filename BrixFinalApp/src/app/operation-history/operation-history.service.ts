import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPaginationModel } from '../Models/IPaginationModel.model';
import { Observable } from 'rxjs';
import { ITransactionModel } from '../Models/ITRansactionModel.model';

@Injectable({
  providedIn: 'root'
})
export class OperationHistoryService {

  mergedUrl: string;
  constructor(private http: HttpClient) { }

  getOperationsList(accountId: string): Observable<any> {
  {
      const mergedUrl = `${environment.getOperationsList}` +
        `page=1&pageCount=5&accountId=${accountId}`;
      return this.http.get<any>(mergedUrl, { observe: 'response' });
    }
  }

  getAll(paginationModel: IPaginationModel, accountId: string): Observable<any> {    
    if (paginationModel.sortBy != undefined) {
      this.mergedUrl = `${environment.getOperationsList}` +
        `page=${paginationModel.pageIndex}&pageCount=${paginationModel.pageSize}
      &OrderBy=${paginationModel.sortBy}&accountId=${accountId}`;
    }
    else {
      this.mergedUrl = `${environment.getOperationsList}` +
        `page=${paginationModel.pageIndex}&pageCount=${paginationModel.pageSize}
        &accountId=${accountId}`;
    }
    return this.http.get<any>(this.mergedUrl, { observe: 'response' });
  }

  getTransactionInfo(id:string): Observable<ITransactionModel>{
    return this.http.get<ITransactionModel>(`${environment.getTransactionDetails}${id}`);
  }
}
