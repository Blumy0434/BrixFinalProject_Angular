import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IAccountModel } from '../Models/IAccountModel.model';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

 account: IAccountModel;
 accountId: string;
 welcome: string = 'Welcome';

 constructor(private _appService: AppService, private _acr: ActivatedRoute,private _router: Router) 
 { }

 ngOnInit(): void {
   this._acr.paramMap.subscribe(params => {
     this.accountId = params.get("accountId");
   });

   if (this.accountId) {
     debugger;
     this._appService.getAccount(this.accountId).subscribe({
       next: card => {
         this.welcome+= ` ${card.firstName} ${card.lastName}`
         this.account = card;         
       },
       error: err => console.log(err)
     }
     );
   }
 } 

 createTransaction(){
  this._router.navigate(["/transaction", this.accountId]);
 }

 logOut(){
   this.accountId = null;
   this._router.navigate(["/home"])
 }
}
