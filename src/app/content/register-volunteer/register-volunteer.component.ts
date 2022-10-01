import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register-volunteer',
  templateUrl: './register-volunteer.component.html',
  styleUrls: ['./register-volunteer.component.css']
})
export class RegisterVolunteerComponent implements OnInit {
  passMinLength = 4;
  phoneFormat = '[0-9]{10}';
  minDate = "1922-01-01"
  maxDate = new Date(new Date()).toISOString().substring(0, 10);
  constructor(public loginService: LoginService, public router: Router, public registerPop: MatDialog) {}


  registerForm = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', {validators: [Validators.required, Validators.minLength(this.passMinLength)]}),
    fullname: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', {validators: [Validators.required, Validators.email]}),
    phone: new FormControl<string>('', {validators: [Validators.required, Validators.pattern(this.phoneFormat)]}),
    occupation: new FormControl<string>('', Validators.required),
    dateofbirth: new FormControl<string>('', {validators: [Validators.required]}),
  })

  onRegister(){
    if(!this.registerForm.valid) return;
    const res = this.loginService.registerVolunteer(this.registerForm.value);
    if(res){
      Swal.fire({
        icon: 'success',
        title: 'Register successful. Please login to continue.',
        showConfirmButton: false,
        timer: 3000,
        heightAuto: false //must set heigh auto
      })
      this.registerPop.closeAll();
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Register failed. Username already exist.',
        showConfirmButton: false,
        timer: 3000,
        heightAuto: false //must set heigh auto
      })
    }
  }


  ngOnInit(): void {
  }

}