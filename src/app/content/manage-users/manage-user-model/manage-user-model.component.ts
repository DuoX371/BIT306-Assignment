import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-manage-user-model',
  templateUrl: './manage-user-model.component.html',
  styleUrls: ['./manage-user-model.component.css']
})
export class ManageUserModelComponent implements OnInit {
  dataInput: any;
  schoolInfo: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private schoolService: SchoolService) { }

  async ngOnInit(): Promise<void> {
    this.dataInput = this.data;
    if(this.dataInput.type !== 'sadmin') return;
    if(this.dataInput.schoolId === undefined) return;
    this.schoolInfo = await this.schoolService.getSchoolBySAdminId(this.dataInput._id);
    console.log(this.schoolInfo)
  }
}
