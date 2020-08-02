import { Component, OnInit} from '@angular/core';
import { IAccountModel } from '../Models/IAccountModel.model';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

 subscription: Subscription;
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
     this.subscription=this._appService.getAccount(this.accountId).subscribe({
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

 goToOperations(){
  this._router.navigate(["/operations" ,this.accountId]);
 }

 logOut(){
   this.accountId = null;
   this._router.navigate(["/home"])
 }
/*
 ngOnDestroy() {
  this.subscription.unsubscribe();
}
*/
}
