// import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { ILocation } from '../../../../../../../../CorronaAngular/CorronaApp/src/app/Models/ILocation.model';
// import { FormBuilder, FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-verification-code',
//   templateUrl: './verification-code.component.html',
//   styleUrls: ['./verification-code.component.css']
// })
// export class VerificationCodeComponent implements OnInit {

//   verificationCodeForm: FormGroup;
//   verificationCode: any;

//   constructor(private fb: FormBuilder) { }


//   ngOnInit(): void {
//     this.verificationCodeForm = this.fb.group({
//       verificationCode: ''      
//     })
//   }
  
//   @Output()
//   verifyCodeEvent: EventEmitter<ILocation> = new EventEmitter();
//   verifyCode() {
//     this.verificationCode = this.verificationCodeForm.value;
//     this.verificationCodeForm.reset();
//     this.verifyCodeEvent.emit(this.verificationCode);
//   }

//   requiredGetErrorMessage(controlName: string): string {
//     if (this.verificationCodeForm.get(controlName).hasError('required')) {
//       return 'You must enter a value';
//     }
//   }
// }
