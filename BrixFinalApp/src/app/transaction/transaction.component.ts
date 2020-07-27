import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from '../transaction/transaction.service'
import { ITransactionModel } from '../Models/ITRansactionModel.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  
  transaction:ITransactionModel;
  transactionForm: FormGroup;
  accountId: string;
  constructor(private fb: FormBuilder, private _transactionService: TransactionService, private _router: Router,
    private _acr: ActivatedRoute) { }
    

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      toAccountId: ['', [Validators.required]],
      amount: ['', [Validators.required], [Validators.max(1000000), [Validators.min(1)]]]
    })
    this._acr.paramMap.subscribe(params => {
      this.accountId = params.get("accountId");
    });
  }

  toAccountGetErrorMessage() {
    if (this.transactionForm.get('toAccount').hasError('required')) {
      return 'You must enter a value';
    }
  }

  amountGetErrorMessage(controlName: number): string {
    if (this.transactionForm.get('amount').hasError('max')) {
      return 'you can move at most one milion'
    }
    if (this.transactionForm.get('amount').hasError('min')) {
      return 'you can move at least one'
    }
  }

  createTransaction() {
    debugger;
    this.transaction=this.transactionForm.get("toAccountId").value;
    this.transaction.amount=+this.transactionForm.get("amount").value;
    this.transaction.fromAccountId=this.accountId;
    //this.transaction.toAccountId=this.transactionForm.get("toAccount").value;
    debugger;
    this._transactionService.createTransaction(this.transaction)
      .subscribe({
        next: isTransactionStarted => {
          this.transactionForm.reset();
          if (isTransactionStarted == true) {
            this._router.navigate(["/accountDetail", this.accountId]);
            alert("transaction started");
          }
          else {
            alert("try again later");
          }
        },
        error: err => {
          this.transactionForm.reset();
          alert(err)
        }
      })
  }
}

