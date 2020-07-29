import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IPaginationModel } from '../Models/IPaginationModel.model';
import { IOperationModel } from '../Models/IOperationModel.model';
import { MatTableDataSource } from '@angular/material/table';
import {OperationHistoryService} from './operation-history.service'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-operation-history',
  templateUrl: './operation-history.component.html',
  styleUrls: ['./operation-history.component.css']
})
export class OperationHistoryComponent implements OnInit {

  constructor(private _operationService:OperationHistoryService,private _acr: ActivatedRoute) { }

  @ViewChild(MatPaginator, { static: true }) pathPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public paginationModel: IPaginationModel = new IPaginationModel();
  operationsFilteredList: IOperationModel[];
  public thArray: string[] = ['operationType', 'fromAccountId', 'toAccountId', 'amount','balance','date'];
  public dataSource: MatTableDataSource<IOperationModel>;
  totalCount: number;
subscription:Subscription;
accountId:string;
  ngOnInit(): void {
    this._acr.paramMap.subscribe(params => {
      this.accountId = params.get("accountId");
  this.subscription= this._operationService.getOperationsList(this.accountId).subscribe({
      next: operations => {
        debugger;
        this.dataSource = new MatTableDataSource<IOperationModel>(operations);
        this.dataSource.paginator = this.pathPaginator;
        this.dataSource.sort = this.sort;
      },
      error: err => console.log(err)
    }); 
    });
  }

applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); 
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches    
  this.dataSource.filter = filterValue;
}

ngAfterViewInit() {
}

switchPage(event: PageEvent) {
  this.paginationModel.pageIndex = event.pageIndex + 1;
  this.paginationModel.pageSize = event.pageSize;
  this.paginationModel.allItemsLength = event.length;
  this.getAllOperations(this.paginationModel);
}

getAllOperations(paginationModel: IPaginationModel) {
  this._operationService.getAll(paginationModel,this.accountId)
    .subscribe((result: any) => {
      this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
      this.dataSource = result.body.value;
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
