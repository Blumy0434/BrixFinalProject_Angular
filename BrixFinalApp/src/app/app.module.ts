import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatTableModule} from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { OpenAccountComponent } from './open-account/open-account.component';
import { LoginComponent } from './login/login.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { TransactionComponent } from './transaction/transaction.component';
import { OperationHistoryComponent } from './operation-history/operation-history.component';

@NgModule({
  declarations: [
    AppComponent,LoginComponent, AccountDetailComponent, OpenAccountComponent, TransactionComponent, OperationHistoryComponent   
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    MatDatepickerModule,
    AppRoutingModule,
    HttpClientModule,    
    RouterModule.forRoot([
      {path: 'home', component: LoginComponent},
      {path: 'operations/:accountId', component: OperationHistoryComponent},
      {path: 'register', component: OpenAccountComponent},   
      {path: 'accountDetail/:accountId', component: AccountDetailComponent}, 
      {path: 'accountDetail', component: AccountDetailComponent},  
      {path: 'transaction/:accountId', component: TransactionComponent},  
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),       
    BrowserAnimationsModule,
    ReactiveFormsModule,    
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule, 
    MatNativeDateModule,    
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,     
    MatIconModule   
  ],  
  bootstrap: [AppComponent],
  exports: [MatDatepickerModule]
})
export class AppModule { }
