import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

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
  constructor(public loginService: LoginService, public router: Router) {}
  

  registerForm = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', {validators: [Validators.required, Validators.minLength(this.passMinLength)]}),
    fullname: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.required),
    phone: new FormControl<string>('', {validators: [Validators.required, Validators.pattern(this.phoneFormat)]}),
    occupation: new FormControl<string>('', Validators.required),
    dateofbirth: new FormControl<string>('', Validators.required),
  })

  onRegister(){
    if(!this.registerForm.valid) return;
    const userType="Volunteer";
    const data = this.registerForm.value;
    const user = this.loginService.registerVolunteer(data.username, data.password, data.fullname, 
      data.email, data.phone, data.occupation, data.dateofbirth, userType);
    if(user === null){
      Swal.fire({
        icon: 'error',
        title: 'Invalid username or password',
        showConfirmButton: false,
        timer: 3000,
        heightAuto: false //must set heigh auto
      })
    }else{
      Swal.fire({
        icon: 'success',
        title: 'Register successful',
        showConfirmButton: false,
        timer: 3000,
        heightAuto: false //must set heigh auto
      })

      //redirect to home page
      // this.router.navigate(['']);
    }
    console.log(JSON.stringify(data));
  }


  ngOnInit(): void {
  }

}
