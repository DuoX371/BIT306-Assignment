import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passMinLength = 4;
  constructor(public loginService: LoginService, public router: Router) { }

  loginForm = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', {validators: [Validators.required, Validators.minLength(this.passMinLength)]})
  })

  onLogin(){
    if(!this.loginForm.valid) return;
    const user = this.loginService.login(this.loginForm.value.username, this.loginForm.value.password);
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
        title: 'Login successful',
        showConfirmButton: false,
        timer: 3000,
        heightAuto: false //must set heigh auto
      })

      //redirect to home page
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
  }

}
