import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-school-admin',
  templateUrl: './register-school-admin.component.html',
  styleUrls: ['./register-school-admin.component.css']
})
export class RegisterSchoolAdminComponent implements OnInit {
  loading = false;
  passMinLength = 4;
  phoneFormat = '[0-9]{10}';
  constructor(public authService: AuthService) { }

  registerSchoolAdminForm = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', {validators: [Validators.required, Validators.minLength(this.passMinLength)]}),
    confirmPassword: new FormControl<string>('', {validators: [Validators.required,Validators.minLength(this.passMinLength)]}),
    fullname: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', {validators: [Validators.required, Validators.email]}),
    phone: new FormControl<string>('', {validators: [Validators.required, Validators.pattern(this.phoneFormat)]}),
    staffid: new FormControl<string>('', Validators.required),
    position: new FormControl<string>('', Validators.required),
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

  async onSubmit(){
    const form = this.registerSchoolAdminForm;
    if(!form.valid) return;
    this.loading = true;
    const res = await this.authService.registerSchoolAdmin(form.value);
    if(res.register){
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
        title: `Register failed. ${res.message}.`,
        showConfirmButton: false,
        timer: 3000,
        heightAuto: false //must set heigh auto
      })
    }
    this.loading = false;
  }

  ngOnInit(): void {
  }

}
