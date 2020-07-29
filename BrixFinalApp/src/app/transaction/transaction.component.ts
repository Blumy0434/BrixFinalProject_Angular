import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from '../transaction/transaction.service'
import { ITransactionModel } from '../Models/ITRansactionModel.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  
  subscription: Subscription;
  transaction:ITransactionModel;
  transactionForm: FormGroup;
  accountId: string;
  constructor(private fb: FormBuilder, private _transactionService: TransactionService, private _router: Router,
    private _acr: ActivatedRoute) { }
    

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      toAccountId: ['', [Validators.required]],
      amount: [null, [Validators.required,Validators.max(1000000),Validators.min(1)]]
    })
   this.subscription=this._acr.paramMap.subscribe(params => {
      this.accountId = params.get("accountId");
    });
  }

  toAccountGetErrorMessage() {
    if (this.transactionForm.get('toAccountId').hasError('required')) {
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
    if (this.transactionForm.get('amount').hasError('required')) {
      return 'You must enter a value';
  }
}

  createTransaction() {
   this.transaction=this.transactionForm.value;
    this.transaction.amount=+this.transactionForm.get("amount").value;
    this.transaction.fromAccountId=this.accountId;
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
  ngOnDestroy() {
    this.subscription.unsubscribe();
}
}

