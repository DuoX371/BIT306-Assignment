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
  globalFilter : any = {type : ''}
  displayedColumns: string[] = ['no', 'username', 'password', 'fullname', 'email'];

  constructor(private authService: AuthService, private manageUserModel: MatDialog) { }

  ngOnInit(): void {
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  applyTypeFilter(event: Event | any) {
    const filterValue = event.value;
    this.globalFilter.type = filterValue === undefined ? '' : filterValue.trim().toLowerCase();
    this.dataSource.filter = this.globalFilter;
  }

  clickedRow(data: any | object){
    this.manageUserModel.open(ManageUserModelComponent, {
      data: data,
      width: '30%',
      height: 'auto',
      position: {top: '5%'}
    })
  }

  //custom filter, type must match case
  customFilterPredicate(){
    return (data: any, filter: object | any) => {
      return data.type.toLowerCase().trim() === filter.type || filter.type === '';
    }
  }
}
