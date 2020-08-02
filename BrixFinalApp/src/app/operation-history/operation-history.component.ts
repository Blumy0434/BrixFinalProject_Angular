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
  public thArray: string[] = ['accountId', 'operationType', 'amount', 'balance', 'date'];
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
  // operations: any[] = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'}
  // ];
//  operations: string[] = ["Debit", "Credit"];

  // operations: any = {
  //   name: 'All',
  //   completed: false,
  //   color: 'primary',
  //   suboperations: [
  //     {name: 'Debit', completed: false, color: 'red'},
  //     {name: 'Credit', completed: false, color: 'green'}      
  //   ]
  // };

  // allComplete: boolean = false;

  // updateAllComplete() {
  //   this.allComplete = this.operations.suboperations != null && this.operations.suboperations.every(t => t.completed);
  // }

  // someComplete(): boolean {
  //   if (this.operations.suboperations == null) {
  //     return false;
  //   }
  //   return this.operations.suboperations.filter(t => t.completed).length > 0 && !this.allComplete;
  // }

  // setAll(completed: boolean) {
  //   this.allComplete = completed;
  //   if (this.operations.suboperations == null) {
  //     return;
  //   }
  //   this.operations.suboperations.forEach(t => t.completed = completed);
  // }
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
    if (this.filterDetails.fromDate != '' && this.filterDetails.fromDate != null) {
      filterQueryString += this.addFromDateToFilterQuery(filterQueryString, this.filterDetails.fromDate);
    }
    if (this.filterDetails.toDate != '' && this.filterDetails.toDate != null) {
      filterQueryString += this.addToDateToFilterQuery(filterQueryString, this.filterDetails.toDate);
    }
    this._operationService.getFilterTransaction(filterQueryString)
      .subscribe((result: any) => {
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