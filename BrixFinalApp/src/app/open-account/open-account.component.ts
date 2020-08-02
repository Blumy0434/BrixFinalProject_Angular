import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IRegisterModel } from '../Models/IRegisterModel.model';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OpenAccountService } from './open-account.service';
import { ISendEmailModel } from '../Models/ISendEmailModel.model';

@Component({
  selector: 'app-open-account',
  templateUrl: './open-account.component.html',
  styleUrls: ['./open-account.component.css']
})
export class OpenAccountComponent implements OnInit {

  subscription: Subscription;
  registerForm: FormGroup;
  registerObject: IRegisterModel;
  hide: boolean = true;
  verifyEmailDiv: boolean = false;
  registerDiv: boolean = true;
  // isDisabled: boolean = false;
  sendEmailObj: ISendEmailModel = new ISendEmailModel();
  constructor(private fb: FormBuilder, private _appService: AppService, private _router: Router,
    private _openAccountService: OpenAccountService) {

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: ['', [Validators.required, Validators.email]],
      password: '',
      verificationCode: ''
    })
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  verifyEmail() { 
    this.registerDiv = false; 
    this.verifyEmailDiv = true;       
    this.sendEmailObj.email = this.registerForm.get('email').value;
    this._openAccountService.sendEmailWithVerificationCode(this.sendEmailObj).subscribe({
      next: r => {
        alert("Email with verification code sent now!");
      },
      error: err => alert(err)
    });
  }

  register() {  
    this.registerDiv = true;
    this.verifyEmailDiv = false;
    this.registerObject = this.registerForm.value;
    this.subscription = this._appService.register(this.registerObject).subscribe({
      next:
        r => {
          if (r === true) {
            alert("Register succeeded!");
            this.verifyEmailDiv = true;
            this.registerForm.reset();
            this._router.navigate(["/home"])
          }
          else {
            alert("Register failed! One or more of your details are wrong.Try again!");
          }
        },
        error: err => {
          debugger;
          alert(err.error.error);
        }
    })
  }

  emailGetErrorMessage() {
    if (this.registerForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }
    return this.registerForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  requiredGetErrorMessage(controlName: string): string {
    if (this.registerForm.get(controlName).hasError('required')) {
      return 'You must enter a value';
    }
  }
}
