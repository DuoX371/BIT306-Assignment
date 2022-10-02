import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../login/login.service';
import { SchoolService } from '../../services/school.service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.css']
})
export class SubmitRequestComponent implements OnInit {
  currentUser = this.loginService.getCurrentUser();
  userSchool = this.schoolService.getSadminSchool();
  minDate = new Date().toISOString().split('T')[0];
  constructor(public loginService: LoginService, public schoolService: SchoolService, public requestService: RequestService) { }

  submitRequestForm = new FormGroup({
    description: new FormControl<string>('', Validators.required),
    date: new FormControl<string>('', {validators: [Validators.required, Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}$')]}),
    time: new FormControl<string>('', {validators: [Validators.required, Validators.pattern('^[0-9]{2}:[0-9]{2}$')]}),
    studentLevel: new FormControl<string>('', Validators.required),
    expectedStudents: new FormControl<string>('', {validators: [Validators.required, Validators.pattern('^[0-9]+$')]}),
  })

  onSubmit(){
    const form = this.submitRequestForm;
    if(!form.valid) return;
    const res = this.requestService.addRequest(form.value);
    Swal.fire({
      title: 'Success!',
      text: 'Request has been submitted',
      icon: 'success',
      position: 'top-end',
      timer: 3000,
      showConfirmButton: false,
      heightAuto: false,
    })

    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null) ;
    });
  }

  ngOnInit(): void {
  }

}
