import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { ManageUserModelComponent } from './manage-user-model/manage-user-model.component';
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  allUsers = this.authService.getAllUsers();
  dataSource = new MatTableDataSource(this.allUsers);
  displayedColumns: string[] = ['no', 'username', 'password', 'fullname', 'email'];

  constructor(private authService: AuthService, private manageUserModel: MatDialog) { }

  ngOnInit(): void {

  }
  applyTypeFilter(event: Event | any) {
    const filterValue = event.value;
    if(filterValue === undefined) return this.dataSource.filter = '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
    return true;
  }

  clickedRow(data: any | object){
    this.manageUserModel.open(ManageUserModelComponent, {
      data: data,
      width: '30%',
      height: 'auto',
      position: {top: '5%'}
    })
    // console.log(data);
  }
}
