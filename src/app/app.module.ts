import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './include/header/header.component';
import { MainComponent } from './main/main.component';
import { TestComponent } from './content/test/test.component';
import { HomeComponent } from './content/home/home.component';
import { LoginComponent } from './content/login/login.component';
import { RegisterVolunteerComponent } from './content/register-volunteer/register-volunteer.component';
import { RegisterSchoolAdminComponent } from './content/register-school-admin/register-school-admin.component';
import { SubmitRequestComponent } from './content/submit-request/submit-request.component';
import { RegisterSchoolComponent } from './content/register-school/register-school.component';
import { ReviewOffersComponent } from './content/review-offers/review-offers.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    TestComponent,
    HomeComponent,
    LoginComponent,
    RegisterVolunteerComponent,
    RegisterSchoolAdminComponent,
    SubmitRequestComponent,
    RegisterSchoolComponent,
    ReviewOffersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
