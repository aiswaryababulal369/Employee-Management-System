import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/Model/Employee';
import { AuthicationServiceService } from 'src/app/Services/authication-service.service';
import { Router } from '@angular/router';
import { Department } from 'src/app/Model/Department';


@Component({
  selector: 'app-departmentdashboard',
  templateUrl: './departmentdashboard.component.html',
  styleUrls: ['./departmentdashboard.component.css']
})
export class DepartmentdashboardComponent  implements OnInit{
  displayedColumns = ['no', 'name', 'username', 'employeeId', 'phone','email','dob','state'];
  

  passedObject:any;
  employees: Employee[] = []; 
  departments: any;
  department!:Department;


  constructor(
    private route: ActivatedRoute,
    private service : AuthicationServiceService,
    private snackBar:MatSnackBar,
    private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const obj1 = params.get('department');
      console.log(obj1)

      if(obj1){
          this.passedObject = JSON.parse(obj1);
          if (this.passedObject && this.passedObject.id) {
            console.log('id : ' + this.passedObject.id);
            this.service.getEmployeesByDepartmentId(this.passedObject.id).subscribe((employees) => {             
              this.employees = employees;
            });
          }          
      }
    });
  }
    


  deleteDepartment(departmentId:number){
    this.service.deleteDepartment(departmentId).subscribe(() => {
      this.departments = this.departments.filter((dep: { id: number; }) => dep.id !== departmentId);
      console.log("deleted dep : " + this.departments);

      this.openSnackBar('Department deleted successfully');
      this.router.navigate([`login`]);
    });
  }

  updateDepartment(department : Department | undefined){
    if (department) {
        const departmentIdToUpdate = department.id;

        // this.service.getDepartmentByDepartmentId(departmentIdToUpdate)?.subscribe((response) => {
        //     this.department= response;
        //     this.router.navigate(['/departmentsignup', { department: JSON.stringify(response), isEditMode: true }]);
        //     console.log("depDash"+response);
        //   });

        if (typeof departmentIdToUpdate === 'number') {
          this.service.getDepartmentByDepartmentId(departmentIdToUpdate).subscribe((response) => {
            this.department = response;
            this.router.navigate(['/departmentsignup', { department: JSON.stringify(response), isEditMode: true }]);
            console.log("depDash" + response);
          });
        } else {
          console.error("Invalid department ID");
        }
      } 
    }

  


 

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    // this.dataSource.filter = filterValue;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
