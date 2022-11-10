import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { SchoolService } from 'src/app/services/school.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-user-model',
  templateUrl: './manage-user-model.component.html',
  styleUrls: ['./manage-user-model.component.css']
})
export class ManageUserModelComponent implements OnInit {
  dataInput: any;
  schoolInfo: any = {name: '',address: '',city: ''};
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private schoolService: SchoolService, private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.dataInput = this.data;
    if(this.dataInput.type !== 'sadmin') return;
    if(this.dataInput.schoolId === undefined) return;
    this.schoolInfo = await this.schoolService.getSchoolBySAdminId(this.dataInput._id);
  }

  updatePassword(){
    Swal.mixin({
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Submit Offer',
      heightAuto: false,
      html: `<input type="password" id="password" class="swal2-input" placeholder="Password">
            <input type="password" id="cPassword" class="swal2-input" placeholder="Confirm Password">`,
      preConfirm: () => {
        const pass = Swal.getPopup().querySelector('#password')['value'];
        const cPass = Swal.getPopup().querySelector('#cPassword')['value'];
        if(pass !== cPass) return Swal.showValidationMessage(`Passwords don't match`);
        if(pass.length < 4) return Swal.showValidationMessage(`Password must be at least 4 characters`);
        return pass;
      }
    }).fire({
      title: 'Enter your new password',
    }).then(async (result) => {
      if(!result.isConfirmed) return;
      const password = result.value;
      const user = this.dataInput.username;
      // call api to update password
      const res = await this.authService.updateUserPassword({username: user, password: password});
      if(res.success){
        Swal.fire({
          icon: 'success',
          title: 'Password Updated',
          text: 'Password has been updated successfully',
          heightAuto: false
        });
      }else {
        Swal.fire({
          icon: 'error',
          title: 'Password Update Failed',
          text: res.message,
          heightAuto: false
        });
      }
    })
  }
}
