import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOperationModel } from '../Models/IOperationModel.model';
import { environment } from 'src/environments/environment';
import { IPaginationModel } from '../Models/IPaginationModel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationHistoryService {

  operationList:Array<IOperationModel>=[
    {fromAccountId:"12345",amount:123,balance:12345,date:new Date(2020,3,14),operationType:true,toAccountId:"1111"},
    {fromAccountId:"12346",amount:123,balance:12345,date:new Date(2020,3,14),operationType:false,toAccountId:"1111"},
    {fromAccountId:"12347",amount:123,balance:12345,date:new Date(2020,3,14),operationType:false,toAccountId:"1111"},
    {fromAccountId:"12348",amount:123,balance:12345,date:new Date(2020,3,14),operationType:true,toAccountId:"1111"},
    {fromAccountId:"12349",amount:123,balance:12345,date:new Date(2020,3,14),operationType:false,toAccountId:"1111"},
    {fromAccountId:"12350",amount:123,balance:12345,date:new Date(2020,3,14),operationType:true,toAccountId:"1111"},
    {fromAccountId:"12351",amount:123,balance:12345,date:new Date(2020,3,14),operationType:false,toAccountId:"1111"},
 ];

  constructor(private http:HttpClient) { }
  getOperationsList(accountId:string): Observable<any>{
   //return this.http.get<IOperationModel[]>(environment.getOperationsList);   
   //paginationModel: IPaginationModel,accountId:string)
   {
    const mergedUrl = `${environment.getOperationsList}` +
        `page=1&pageCount=5&accountId=${accountId}`;
    return this.http.get<any>(mergedUrl, { observe: 'response' });
  }
}

  getAll(paginationModel: IPaginationModel,accountId:string): Observable<any>{
    const mergedUrl = `${environment.getOperationsList}` +
        `getPage?page=${paginationModel.pageIndex}&pageCount=${paginationModel.pageSize}
        &accountId=${accountId}`;
    return this.http.get<any>(mergedUrl, { observe: 'response' });
  }
}
