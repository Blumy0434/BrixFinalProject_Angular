import { Component, OnInit, ViewChild } from '@angular/core';
import {IOperationModel} from '../Models/IOperationModel.model'
import {IPaginationModel} from '../Models/IPaginationModel.model'

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-operation-history-filter',
  templateUrl: './operation-history-filter.component.html',
  styleUrls: ['./operation-history-filter.component.css']
})
export class OperationHistoryFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

 
}
