import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/Model/Department';
import { Employee } from 'src/app/Model/Employee';
import { AuthicationServiceService } from 'src/app/Services/authication-service.service';
import { EmployeesignupComponent } from '../employeesignup/employeesignup.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.css']
})
export class EmployeedashboardComponent {

  passedObject?:Employee;
  departments: Department[] = []; 
  employee!: Employee;
  constructor(
    private service : AuthicationServiceService,
    private snackBar:MatSnackBar,
    private route:ActivatedRoute,
    private router : Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MatDialog) public data1:any
    ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const obj1 = params.get('employee');
      if (obj1) {
        this.passedObject = JSON.parse(obj1);
          if (this.passedObject && this.passedObject.id) {
            console.log('id : ' + this.passedObject.id);
          }
      } else {
        this.openSnackBar("error")
      }
    });
  }

  


  updateEmployee(employee: Employee| undefined) {
    if (employee) {
      const employeeIdToUpdate = employee.id;
      this.service.getEmployeeByEmployeeId(employeeIdToUpdate).subscribe((response) => {
          this.employee= response;
          this.router.navigate(['/employeesignup', { employee: JSON.stringify(response), isEditMode: true }]);
          console.log("empDash"+response);
        });
    } 
  }
    
  deleteEmployee(employeeId:number) {
    this.service.deleteEmployee(employeeId).subscribe(() => {
      this.openSnackBar("Employee Deleted");
      this.router.navigate([`login`]);
    });

  }

  openSnackBar(message:string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,  // Duration for which the snackbar will be displayed (in milliseconds)
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
