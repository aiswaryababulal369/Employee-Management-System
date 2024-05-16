import { Component, Inject, inject } from '@angular/core';
import { AuthicationServiceService } from 'src/app/Services/authication-service.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Employee } from 'src/app/Model/Employee';
import { Department } from 'src/app/Model/Department';
import { EmployeesignupComponent } from '../employeesignup/employeesignup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentsignupComponent } from '../departmentsignup/departmentsignup.component';




@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {

  
  departments: Department[] = []; 
  employee: Employee[] = [];
  posts:any;
  
  constructor(private service:AuthicationServiceService,public dialog: MatDialog) {}
  
  ngOnInit() {}

  openDialogDepartment() {
    this.dialog.open(DialogDataExampleDialog, {
      height: '400px',
      width: '600px',
      data: 
      {departments:this.departments }
    }
        )
  }

  openDialogEmployee(){
    this.dialog.open(EmploeeDialog, {
      height: '600px',
      width: '900px',
      data: 
      {employees:this.employee }
    }
        )
  }
}



@Component({
  selector: 'departmentlist',
  templateUrl: 'departmentlist.html',
})
export class DialogDataExampleDialog {
  department!:Department;
  departments: Department[] = []; 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,@Inject(MatDialog) public data1:any,private service:AuthicationServiceService, private snackBar: MatSnackBar,private dialog: MatDialog,) {}

  displayedColumns: string[] = ['no', 'name', 'username', 'id','action'];
  
  dialogData:any;
  ngOnInit(){
    this.service.getDepartments().subscribe(res=>{
      this.dialogData=res;
      this.departments = this.dialogData;
    });
  }

  deleteDepartment(departmentId: number){
    this.service.deleteDepartment(departmentId).subscribe(() => {
      this.departments = this.departments.filter(dep => dep.id !== departmentId);
      this.openDeleteSnackbar();
    });
  }

  updateDepartment(department: Department){
    const dialogRef = this.dialog.open(DepartmentsignupComponent, {
      height: '800px',
      width: '900px',
      data: { department, isEditMode: true }
    });
  
    
    
    dialogRef.afterClosed().subscribe(( )=> {
      if (department && department.id) {
        const departmentIdToUpdate = department.id;
        this.service.getDepartmentByDepartmentId(departmentIdToUpdate).subscribe(
          (response) => {
            this.department=response;            
            console.log(response);
          });
      }
    });

  }

  openDeleteSnackbar(): void {
    this.snackBar.open('Department deleted', 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  
}

@Component({
  
  selector: 'employeelist',
  templateUrl: 'employeelist.html',
})
export class EmploeeDialog {
  employee!: Employee; 
  employees: Employee[] = []
  constructor(private dialog: MatDialog,private service:AuthicationServiceService,@Inject(MAT_DIALOG_DATA) public data: any,@Inject(MatDialog) public data1:any) {}

  
  displayedColumns: string[] = ['no', 'name', 'username', 'id','departmentId','phone','email','dob','state','action'];
  dialogData:any;
  ngOnInit(){
    this.service.getEmployees().subscribe(res => {
      this.dialogData=res;
      this.employees=this.dialogData;
      console.log(this.employees,"Success Employee");
    });
    

  }

  deleteEmployee(employeeId:number){
    this.service.deleteEmployee(employeeId).subscribe((response) => {
      console.log(response);
    });
  }

  updateEmployee(employee:Employee){
    const dialogRef = this.dialog.open(EmployeesignupComponent, {
      height: '800px',
      width: '900px',
      data: { employee, isEditMode: true }
    });
  
    
    
    dialogRef.afterClosed().subscribe(( )=> {
      if (employee) {
        const employeeIdToUpdate = employee.id;
        this.service.getEmployeeByEmployeeId(employeeIdToUpdate).subscribe(
          (response) => {
            this.employee=response;
            console.log(response);
          });
      }
    });

      
  }
  

}


