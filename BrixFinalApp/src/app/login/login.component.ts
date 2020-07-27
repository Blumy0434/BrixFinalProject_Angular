import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pageTitle = 'Welcome';
  hide = true;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private _appService: AppService, private _router: Router) 
  {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    })
  }

  login() {
    this._appService.login(this.loginForm.value).subscribe({
      next: accountId => {
        this.loginForm.reset();
        if (accountId != null) {
          debugger;
          this._router.navigate(["/accountDetail", accountId]);
        }
        else {
          alert("let's register now!");
        }
      },
      error: err => {
        this.loginForm.reset();
        alert(err)
      }
    })
  }

  emailGetErrorMessage() {    
    if (this.loginForm.get('email').hasError('required')) {      
      return 'You must enter a value';
    }
    return this.loginForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  requiredGetErrorMessage(controlName: string): string{
    if (this.loginForm.get(controlName).hasError('required')) {
      return 'You must enter a value';
    }
  }
}
