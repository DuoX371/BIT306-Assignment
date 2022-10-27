import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { SchoolService } from '../../services/school.service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.css']
})
export class SubmitRequestComponent implements OnInit {
  loading = false;
  checked = false;
  currentUser = this.authService.getCurrentUser();
  userSchool: any;

  minDate = new Date().toISOString().split('T')[0];
  constructor(public authService: AuthService, public schoolService: SchoolService, public requestService: RequestService, public router: Router) { }

  submitRequestForm = new FormGroup({
    description: new FormControl<string>('', Validators.required),
    date: new FormControl<string>('', {validators: [Validators.required, Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}$')]}),
    time: new FormControl<string>('', {validators: [Validators.required, Validators.pattern('^[0-9]{2}:[0-9]{2}$')]}),
    studentLevel: new FormControl<string>('', Validators.required),
    expectedStudents: new FormControl<string>('', {validators: [Validators.required, Validators.pattern('^[0-9]+$')]}),
    // Optional resources
    rDescription: new FormControl<string>(''),
    rType: new FormControl<string>(''),
    rQuantity: new FormControl<string>(''),
  })

  async onSubmit(){
    const form = this.submitRequestForm;
    if(!form.valid) return;
    this.loading = true;
    const res = await this.requestService.addRequest(form.value);
    if(!res) return;
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
    this.loading = false;
  }

  async ngOnInit(): Promise<void> {
    this.userSchool = await this.schoolService.getSadminSchool();
    if(this.userSchool === null){
      this.router.navigate(['/register-school'], {queryParams: {noSchool: true}});
    }
    this.submitRequestForm.get('date').setValue(this.minDate);
  }

  updateCheck(){
    this.checked = !this.checked;
    if(this.checked){
      this.submitRequestForm.get('rDescription').enable();
      this.submitRequestForm.get('rType').enable();
      this.submitRequestForm.get('rQuantity').enable();
      this.submitRequestForm.get('rDescription').setValidators(Validators.required);
      this.submitRequestForm.get('rType').setValidators(Validators.required);
      this.submitRequestForm.get('rQuantity').setValidators(Validators.required);
    }
    else{
      this.submitRequestForm.get('rDescription').disable();
      this.submitRequestForm.get('rType').disable();
      this.submitRequestForm.get('rQuantity').disable();
      this.submitRequestForm.get('rDescription').setValidators(null);
      this.submitRequestForm.get('rType').setValidators(null);
      this.submitRequestForm.get('rQuantity').setValidators(null);
    }

    // if(this.checked){
    //   this.submitRequestForm.get('description').enable();
    // }else{
    //   this.submitRequestForm.get('description').disable();
    // }
  }
}
