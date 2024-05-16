import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Component/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './Component/signup/signup.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { DepartmentsignupComponent } from './Component/departmentsignup/departmentsignup.component';
import { CategoryComponent } from './Component/category/category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdmindashboardComponent, DialogDataExampleDialog,EmploeeDialog } from './Component/admindashboard/admindashboard.component';
import { EmployeesignupComponent } from './Component/employeesignup/employeesignup.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentdashboardComponent } from './Component/departmentdashboard/departmentdashboard.component';
import { EmployeedashboardComponent } from './Component/employeedashboard/employeedashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DepartmentsignupComponent,
    CategoryComponent,
    SignupComponent,
    AdmindashboardComponent,
    EmployeesignupComponent,
    DepartmentdashboardComponent,
    EmployeedashboardComponent,
    DialogDataExampleDialog,
    EmploeeDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    MatTabsModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [{ provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }],
  bootstrap: [AppComponent]
})
export class AppModule { }
