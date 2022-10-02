import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-register-school',
  templateUrl: './register-school.component.html',
  styleUrls: ['./register-school.component.css']
})
export class RegisterSchoolComponent implements OnInit {
  adminSchool = this.schoolService.getSadminSchool();

  constructor(private schoolService: SchoolService, private router: Router, private route: ActivatedRoute) { }

  registerSchool = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    address: new FormControl<string>('', Validators.required),
    city: new FormControl<string>('', Validators.required),
  })

  onSubmit(){
    if(!this.registerSchool.valid) return;
    this.schoolService.registerSchool(this.registerSchool.value);

    Swal.fire({
      icon: 'success',
      title: `School ${this.registerSchool.value.name} registered successfully`,
      showConfirmButton: false,
      position: 'top-end',
      timer: 3000,
      heightAuto: false //must set heigh auto
    })
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
  }

  ngOnInit(): void {
    if(this.route.snapshot.queryParamMap.get('noSchool')){
      Swal.fire({
        icon: 'error',
        title: 'Please register a school to continue',
        showConfirmButton: false,
        position: 'top-end',
        timer: 2000,
        heightAuto: false //must set heigh auto
      })
    }
  }

}
