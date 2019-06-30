import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../service/auth/authentication.service';
import { center } from '../../sharingData/user-data';
import { Center } from '../../model/app.center';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 
  constructor(
    private router : Router,
    private auth : AuthenticationService,
    private formBuilder: FormBuilder
  ){}
  loginForm: FormGroup;
  email : string;
  password : string;
  isSubmitted  =  false;
 
  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  
  }
  get formControls() { return this.loginForm.controls; }
  
  angSubmit(): void {
    console.log(this.loginForm.value['email']);
    console.log(this.loginForm.value);
      // if(this.authInfoForm["email"] == "admin" && this.password == "admin") {
      //   this.router.navigate(['dashboard']);
      // }
      this.router.navigate(['dashboard/']);
  }
  ngSubmit() : void {
    event.preventDefault();
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
  //  this.authService.login(this.loginForm.value);

    this.auth.celterLogin(this.loginForm.value['email'], this.loginForm.value['password']).subscribe(
      data => {
        
        //initial center data
        this.InitialCenter(data);
        console.log("login CenterId" + center.Id);
        //console.log("address" + data['data'][0].Address);
        
        if(data != null) {
          this.router.navigate(['dashboard/' + data['data'][0].Id]);
          localStorage.setItem('centerId', data['data'][0].Id);
        } else {
          // this.popup.show();
          alert("invalid creditial")
        }
      }
    )
  }

  InitialCenter(data : Object) {
    center.Address = data['data'][0].Address;
    center.Answer = data['data'][0].Answer; 
    center.Area_Work = data['data'][0].Area_Work;
    center.City = data['data'][0].City; 
    center.ContactPerson = data['data'][0].ContactPerson;
    center.Email = data['data'][0].Email;
    center.Id = data['data'][0].Id;
    center.Mobile = data['data'][0].Mobile;
    center.Name = data['data'][0].Name;
    center.Password = data['data'][0].Password;
    center.Question = data['data'][0].Question;
    center.Status = data['data'][0].Status;
    center.UserName = data['data'][0].UserName;
    center.message = data['data'][0].message;
    center.state = data['data'][0].state;
    center.zip = data['data'][0].zip;
  }

}

