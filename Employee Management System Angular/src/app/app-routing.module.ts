import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './Component/signup/signup.component';
import { LoginComponent } from './Component/login/login.component';
import { AdmindashboardComponent } from './Component/admindashboard/admindashboard.component';
import { EmployeesignupComponent } from './Component/employeesignup/employeesignup.component';
import { DepartmentsignupComponent } from './Component/departmentsignup/departmentsignup.component';
import { EmployeedashboardComponent } from './Component/employeedashboard/employeedashboard.component';
import { DepartmentdashboardComponent } from './Component/departmentdashboard/departmentdashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:"signup", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path:"admindashboard" , component: AdmindashboardComponent},
  {path:"employeesignup", component: EmployeesignupComponent},
  {path: 'departmentsignup', component: DepartmentsignupComponent},
  {path:"employeedashboard", component: EmployeedashboardComponent},
  {path:"departmentdashboard", component: DepartmentdashboardComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
