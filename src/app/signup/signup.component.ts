import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidationService } from '../services/custom-validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
 
  userForm = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(4), 
                this.service.validateUsernameNotTaken.bind(this.service)]],
    password: ["", Validators.required],
    confirmPassword: ["", Validators.required],
    address: this.fb.group({
      street: [""],
      city: [""],
      state: [""],
      zipCode: [""],
    })
  }, {
    Validator: this.service.passwordMatchValidator("password", "confirmPassword")
  });
  stateOptions:string[] = ["Punjab", "Sindh", "KPK"]

  constructor(private fb:FormBuilder, private service: CustomValidationService){}

  useAddressInfo: any = {
    street: "1234 Main Street",
    city: "Rahim Yar Khan",
    state: this.stateOptions[0],
    zipCode: '64200'
  }

  ngOnInit(){
  
  }

  autoFillAddress(){
    this.userForm.patchValue({
      address: {
        street: this.useAddressInfo.street,
        city: this.useAddressInfo.city,
        state: this.useAddressInfo.state,
        zipCode: this.useAddressInfo.zipCode
      }
    })
  }

  clear(){
   this.userForm.reset();
  
  }

  onSubmit(){
    console.log(this.userForm.value);
  }

}
