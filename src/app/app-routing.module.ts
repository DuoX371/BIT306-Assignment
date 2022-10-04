import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './content/login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterSchoolAdminComponent } from './content/register-school-admin/register-school-admin.component';
import { RegisterSchoolComponent } from './content/register-school/register-school.component';
import { SubmitRequestComponent } from './content/submit-request/submit-request.component';
import { ReviewOffersComponent } from './content/review-offers/review-offers.component';
import { ManageUsersComponent } from './content/manage-users/manage-users.component';
import { ViewRequestComponent } from './content/view-request/view-request.component';

// Auth Guard
import { AdminGuard } from './authGuard/admin.guard';
import { SchoolAdminGuard } from './authGuard/school-admin.guard';
import { VolunteerGuard } from './authGuard/volunteer.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent, pathMatch: 'full', data: {title: 'Login'}},
  {path: '', component: MainComponent, children: [
    {path: '', component: ViewRequestComponent, pathMatch: 'full', data: {title: 'View Request'}},
    // Admin Pages
    {path: 'register-school-admin', component: RegisterSchoolAdminComponent, canActivate: [AdminGuard], data: {title: 'Register School Admin'}},
    {path: 'manage-users', component: ManageUsersComponent, canActivate: [AdminGuard], data: {title: 'Manage Users'}},
    // School Admin Pages
    {path: 'register-school', component: RegisterSchoolComponent, canActivate: [SchoolAdminGuard], data: {title: 'Register School'}},
    {path: 'submit-request', component: SubmitRequestComponent, canActivate: [SchoolAdminGuard], data: {title: 'Submit Request'}},
    {path: 'review-offers', component: ReviewOffersComponent, canActivate: [SchoolAdminGuard], data: {title: 'Review Offers'}},
    //Volunteer Page
    {path: 'view-request', component: ViewRequestComponent, data: {title: 'View Request'}},
  ]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }




