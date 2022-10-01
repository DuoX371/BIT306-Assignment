import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-register-school-admin',
  templateUrl: './register-school-admin.component.html',
  styleUrls: ['./register-school-admin.component.css']
})
export class RegisterSchoolAdminComponent implements OnInit {
  passMinLength = 4;
  constructor(public loginService: LoginService) { }

  registerSchoolAdminForm = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', {validators: [Validators.required, Validators.minLength(this.passMinLength)]}),
    confirmPassword: new FormControl<string>('', {validators: [Validators.required,Validators.minLength(this.passMinLength)]}),
  }, {validators: this.validatePassword('password', 'confirmPassword')})

  validatePassword(password: string, confirmPassword: string): ValidatorFn {
    return (control: AbstractControl): {[key: string] : any} | null => {
      const passwordControl = control.get(password);
      const confirmPasswordControl = control.get(confirmPassword);
      if(confirmPasswordControl.value === '') return null;
      if(passwordControl.value !== confirmPasswordControl.value){
        return {'passwordMismatch': true};
      }
      return null;
    }
  }

  onSubmit(){
    const form = this.registerSchoolAdminForm;
    if(!form.valid) return;
    const res = this.loginService.registerSchoolAdmin(form.value);
    if(res){
      Swal.fire({
        icon: 'success',
        title: `School Admin ${form.value.username} registered successfully`,
        showConfirmButton: false,
        timer: 3000,
        heightAuto: false //must set heigh auto
      })
      form.reset();
      Object.keys(form.controls).forEach(key => {
        form.get(key).setErrors(null) ;
      });
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
