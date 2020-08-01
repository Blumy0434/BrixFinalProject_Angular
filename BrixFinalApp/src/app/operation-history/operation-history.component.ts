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
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-operation-history',
  templateUrl: './operation-history.component.html',
  styleUrls: ['./operation-history.component.css']
})
export class OperationHistoryComponent implements OnInit {

  constructor(private _operationService: OperationHistoryService,
    private _acr: ActivatedRoute, private fb: FormBuilder) { }

  @ViewChild(MatPaginator, { static: true }) pathPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public paginationModel: IPaginationModel = new IPaginationModel();
  operationsFilteredList: IOperationModel[];
  public thArray: string[] = ['accountId', 'operationType', 'amount', 'balance', 'date', 'transactionId'];
  public dataSource: MatTableDataSource<IOperationModel>;
  title: string;
  titleName: string;
  totalCount: number;
  column: string;
  subscription: Subscription;
  accountId: string;
  transactionId: string;
  transactionDetailesClicked: boolean = false;
  transactionInfo: ITransactionModel;
  filterForm: FormGroup;
  filterDetails: any;

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      fromDate: '',
      toDate: '',
      fromAmount: '',
      toAmount: ''
    });
    this._acr.paramMap.subscribe(params => {
      this.accountId = params.get("accountId");
    });
    this.subscription = this._operationService.getAll(this.paginationModel, this.accountId)
      .subscribe((result: any) => {
        this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
        this.transactionId = (result.body.transactionId);
        this.dataSource = new MatTableDataSource<IOperationModel>(result.body);
        this.dataSource.paginator = this.pathPaginator;
        this.dataSource.sort = this.sort;
      });
  }

  transactionDetails(trnsaction: string) {
    if (this.transactionId == trnsaction) {
      this.transactionDetailesClicked = false;
      this.transactionId = '';
    }
    else {
      this.transactionId = trnsaction;
      this.transactionDetailesClicked = true;
      this._operationService.getTransactionInfo(trnsaction).subscribe({
        next: info => {
          this.transactionInfo = info;
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

  filterData() {
    let filterQueryString: string = `AccountId=${this.accountId}`;
    this.filterDetails = this.filterForm.value;
    if (this.filterDetails.fromDate != '') {
      filterQueryString += this.addFromDateToFilterQuery(filterQueryString, this.filterDetails.fromDate);
    }
    if (this.filterDetails.toDate != '') {
      filterQueryString += this.addToDateToFilterQuery(filterQueryString, this.filterDetails.toDate);
    }
    this._operationService.getFilterTransaction(filterQueryString)
      .subscribe((result: any) => {
        debugger;        
        this.dataSource = result;
      });
      filterQueryString = `AccountId=${this.accountId}`;
      this.filterForm.reset();
  }

  addFromDateToFilterQuery(filterQueryString, fromDate): string{ 
    
      return `&Query.FromDate=${fromDate.toJSON()}`;   
  }

  addToDateToFilterQuery(filterQueryString, toDate): string{       
      return `&Query.ToDate=${toDate.toJSON()}`;    
  }

  
  SortByTitle(event: any) {
    this.title = event.srcElement.ariaLabel;
    this.titleName = (this.title).substr((this.title).lastIndexOf(' ') + 1);
    if (this.titleName == "amount") {
      this.paginationModel.sortBy = "transactionAmount";
    }
    else {
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
}