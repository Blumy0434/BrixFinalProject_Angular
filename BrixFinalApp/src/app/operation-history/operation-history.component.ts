import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IPaginationModel } from '../Models/IPaginationModel.model';
import { IOperationModel } from '../Models/IOperationModel.model';
import { MatTableDataSource } from '@angular/material/table';
import { OperationHistoryService } from './operation-history.service'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITransactionModel } from '../Models/ITRansactionModel.model';

@Component({
  selector: 'app-operation-history',
  templateUrl: './operation-history.component.html',
  styleUrls: ['./operation-history.component.css']
})
export class OperationHistoryComponent implements OnInit {

  constructor(private _operationService: OperationHistoryService, private _acr: ActivatedRoute) { }

  @ViewChild(MatPaginator, { static: true }) pathPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public paginationModel: IPaginationModel = new IPaginationModel();
  operationsFilteredList: IOperationModel[];
  public thArray: string[] = ['accountId','operationType', 'amount', 'balance', 'date','transactionId'];
  public dataSource: MatTableDataSource<IOperationModel>;
  title : string;
  titleName: string;
  totalCount: number;
  column:string;
  subscription: Subscription;
  accountId: string;
  transactionId:string;
  transactionDetailesClicked:boolean=false;
  transactionInfo:ITransactionModel;


  ngOnInit(): void {
    this._acr.paramMap.subscribe(params => {
      this.accountId = params.get("accountId");      
    });
    this.subscription = this._operationService.getAll(this.paginationModel, this.accountId)
      .subscribe((result: any) => {
        this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
        this.transactionId=(result.body.transactionId);
        this.dataSource = new MatTableDataSource<IOperationModel>(result.body);
        this.dataSource.paginator = this.pathPaginator;
        this.dataSource.sort = this.sort;
      });
  }

  transactionDetails(trnsaction: string){
    if(this.transactionId==trnsaction){
      this.transactionDetailesClicked=false;
      this.transactionId='';
    }    
    else{
 this.transactionId=trnsaction;
 this.transactionDetailesClicked=true;
  this._operationService.getTransactionInfo(trnsaction).subscribe({
  next: info => {
    this.transactionInfo= info;      
  },
  error: err => console.log(err)
});
} 
} 

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();   
    this.dataSource.filter = filterValue;
  }
  
  switchPage(event: PageEvent) {    
    this.paginationModel.pageIndex = event.pageIndex + 1;
    this.paginationModel.pageSize = event.pageSize;
    this.paginationModel.allItemsLength = event.length;    
    this.getAllOperations(this.paginationModel);
  }

  SortByTitle(event: any){
    this.title = event.srcElement.ariaLabel;
    this.titleName = (this.title).substr((this.title).lastIndexOf(' ') + 1);
    if(this.titleName == "amount"){      
      this.paginationModel.sortBy = "transactionAmount";
    }
    else{
      this.paginationModel.sortBy = this.titleName;
    }
    this.getAllOperations(this.paginationModel);
  }

  getAllOperations(paginationModel: IPaginationModel) {
    this._operationService.getAll(paginationModel, this.accountId)
      .subscribe((result: any) => {
        this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
        this.dataSource = result.body;
      });
  }
  /*
  searchLocation(locationSearch: ILocationSearch) {
    let stringLocation = "";
    if (locationSearch.location != null) {
      stringLocation += "locationSearch.Location=" + locationSearch.location;
    }
  
    if (locationSearch.startDate != null) {
      if (stringLocation != "") {
        stringLocation += "&locationSearch.StartDate=" + (locationSearch.startDate).toJSON();
      }
  
      else {
        stringLocation += "locationSearch.StartDate=" + (locationSearch.startDate).toJSON();
      }
    }
    if (locationSearch.endDate != null) {
      if (stringLocation != "") {
        stringLocation += "&locationSearch.EndDate=" + (locationSearch.endDate).toJSON();
      }
      else {
        stringLocation += "locationSearch.EndDate=" + (locationSearch.endDate).toJSON();
      }
    }
    if (locationSearch.age != null) {
      if (stringLocation != "") {
        stringLocation += "&locationSearch.Age=" + locationSearch.age;
      }
  
      else {
        stringLocation += "locationSearch.Age=" + locationSearch.age
      }
  
    }
    this._locationService.filterLocation(stringLocation).subscribe({
      next: locations => {
        this.dataSource = new MatTableDataSource<ILocation>(locations);
        this.dataSource.paginator = this.pathPaginator;
        this.dataSource.sort = this.sort;
      },
      error: err => console.log(err)
  
    });
  }
  */
}
