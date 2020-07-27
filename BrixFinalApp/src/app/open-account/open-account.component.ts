import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IRegisterModel } from '../Models/IRegisterModel.model';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-open-account',
  templateUrl: './open-account.component.html',
  styleUrls: ['./open-account.component.css']
})
export class OpenAccountComponent implements OnInit {

  registerForm: FormGroup;
  registerObject: IRegisterModel;
  hide = true;

  constructor(private fb: FormBuilder, private _appService: AppService, private _router: Router) {

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: ['',[Validators.required, Validators.email]],
      password: ''           
    })
  }

  register() {
    this.registerObject = this.registerForm.value;    
    this._appService.register(this.registerObject).subscribe({
      next:
        r => {
          if(r === true){
            alert("Register succeeded!");
            this._router.navigate(["/home"])
          }
          else{
            alert("Register failed! One or more of your details are wrong.Try again!");
          }
        }
    })
  }

  emailGetErrorMessage() {        
    if (this.registerForm.get('email').hasError('required')) {      
      return 'You must enter a value';
    }
    return this.registerForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  requiredGetErrorMessage(controlName: string): string{
    if (this.registerForm.get(controlName).hasError('required')) {      
      return 'You must enter a value';
    }
  }
}
