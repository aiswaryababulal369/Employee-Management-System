import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/Model/Employee';
import { AuthicationServiceService } from 'src/app/Services/authication-service.service';

@Component({
  selector: 'app-employeesignup',
  templateUrl: './employeesignup.component.html',
  styleUrls: ['./employeesignup.component.css']
})
export class EmployeesignupComponent {

  employee: Employee = new Employee();
  departments: any = [];
  states: any = [];
  errorMessage: string = "";
  isEditMode: boolean = false;



  constructor(
    private formBuilder: FormBuilder,
    private service: AuthicationServiceService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EmployeesignupComponent>,
    private route: ActivatedRoute
  ) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  submitted = false;


  ngOnInit(): void {

    const routeData = this.route.snapshot.paramMap.get('employee');
    const isEditMode = this.route.snapshot.paramMap.get('isEditMode');
    console.log("RouteData" + routeData, isEditMode);


    this.form = this.formBuilder.group(
      {
        username: ['', Validators.required],
        name: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', [Validators.required, this.passwordsMatchValidator.bind(this)]],
        departmentId: ['', Validators.required],
        phone: ['', Validators.required],
        emailId: ['', Validators.required],
        dob: ['', Validators.required],
        state: ['', Validators.required],
      });

    this.service.getStates().subscribe((response: any) => {
      this.states = response;
    }
    );

    this.service.getDepartments().subscribe((response: any) => {
      this.departments = response;
    });

    if (this.data && this.data.isEditMode || routeData && isEditMode) {
      this.isEditMode = true;
      let employee = this.data.employee;
      let employee1 = JSON.parse(routeData!);


      console.log("employee1" + employee1);
      console.log(JSON.stringify(employee1));

      if (employee) {
        this.form.patchValue({
          username: employee.username,
          name: employee.name,
          password: employee.password,
          confirmPassword: employee.password,
          departmentId: employee.departmentId,
          phone: employee.phone,
          email: employee.emailId,
          dob: employee.dob,
          state: employee.state
        });
      }
      else {
        if (employee1 && employee1.id) {
          this.form.patchValue({
            username: employee1.username,
            name: employee1.name,
            password: employee1.password,
            confirmPassword: employee1.password,
            departmentId: employee1.departmentId,
            phone: employee1.phone,
            email: employee1.emailId,
            dob: employee1.dob,
            state: employee1.state
          });
        }
      }
    }

  }

  get f() {
    return this.form.controls;
  }


  onLogin() {

    console.log('Form values:', this.form.value);

    const isEditMode = this.route.snapshot.paramMap.get('isEditMode');
    const routeData = this.route.snapshot.paramMap.get('employee');


    if (this.form.invalid) {
      // If the form is invalid, do not proceed with submission
      return;
    }
    this.submitted = true;

    console.log('Form values:', this.form.value);


    const password = this.form.controls['password'].value;
    const confirmPassword = this.form.controls['confirmPassword'].value;


    if (password === confirmPassword) {

      if (isEditMode) {
        const updatedEmployee: Employee = this.form.value;
        if (routeData) {
          const employeeData = JSON.parse(routeData);
          const employeeIdToUpdate = employeeData.id;
          this.service.updateEmployee(employeeIdToUpdate, updatedEmployee).subscribe(
            (response) => {
              this.openSnackBar("Employee Updated");
              console.log(response);
              // this.dialogRef.close();
            });
        }
      }
      else {
        if (this.isEditMode) {
          const updatedEmployee: Employee = this.form.value;
          console.log(updatedEmployee);
          let employeeIdToUpdate: number;
          employeeIdToUpdate = this.data.employee.id;
          console.log(employeeIdToUpdate);
          console.log(employeeIdToUpdate);
          this.service.updateEmployee(employeeIdToUpdate, updatedEmployee).subscribe(
            (response) => {
              this.openSnackBar("Employee Updated");
              console.log(response);
              this.dialogRef.close();
            }
          );
        }
        else {
          this.employee = this.form.value;
          this.service.postEmployee(this.employee).subscribe((res) => {
            console.log(res);
            this.openSnackBar("Employee Added");
          });
        }
      }
    } else {
      this.openSnackBar('Password do not Match');
    }
  }
  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,  // Duration for which the snackbar will be displayed (in milliseconds)
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }


  passwordsMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'passwordsNotMatch': true };
  }
}