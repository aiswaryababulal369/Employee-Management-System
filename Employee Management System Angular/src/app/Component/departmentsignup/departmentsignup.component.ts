import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/Model/Department';
import { AuthicationServiceService } from 'src/app/Services/authication-service.service';


@Component({
  selector: 'app-departmentsignup',
  templateUrl: './departmentsignup.component.html',
  styleUrls: ['./departmentsignup.component.css']
})
export class DepartmentsignupComponent implements OnInit {

  department: Department = new Department();
  submitted = false;
  errorMessage: string = "";
  isEditMode: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private service: AuthicationServiceService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DepartmentsignupComponent>) { }

  form: FormGroup = new FormGroup({
    // username: new FormControl(''),
    // password: new FormControl('')
    username: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', [Validators.required, this.passwordsMatchValidator.bind(this)])
  });


  ngOnInit(): void {
    const routeData = this.route.snapshot.paramMap.get('department');
    const isEditMode = this.route.snapshot.paramMap.get('isEditMode');
   

    this.form = this.formBuilder.group(
      {
        username: ['', Validators.required],
        name: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', [Validators.required, this.passwordsMatchValidator.bind(this)]]
      });

    if (this.data && this.data.isEditMode || routeData && isEditMode) {
      this.isEditMode = true;
      const departments = this.data.department;
      let department1=JSON.parse(routeData!);

      console.log("employee1" + department1);
      console.log("department1" + JSON.stringify(department1));

      if (departments) {
        this.form.patchValue({
          username: departments.username,
          name: departments.name,
          password: departments.password,
          confirmPassword: departments.password
        });
      }
      else {
        if (department1) {
          this.form.patchValue({
            username: department1.username,
            name: department1.name,
            password: department1.password,
            confirmPassword: department1.password
          });
        }

      }
    }

  }



  get f() {
    return this.form.controls;
  }


  onLogin() {
    this.submitted = true;

    const password = this.form.controls['password'].value;
    const confirmPassword = this.form.controls['confirmPassword'].value;

    const isEditMode = this.route.snapshot.paramMap.get('isEditMode');
    const routeData = this.route.snapshot.paramMap.get('department');

    if (this.form.invalid) {
      // If the form is invalid, do not proceed with submission
      return;
    }

    if (password === confirmPassword) {
      if (isEditMode) {
        let updatedDepartment: Department = this.form.value;
        console.log("updatedDepartment" + JSON.stringify(updatedDepartment));
        updatedDepartment!=JSON.stringify(updatedDepartment);
        console.log(updatedDepartment)
        if (routeData) {
          console.log("in side the if rout");
          
          console.log(routeData)
          const departmentData = JSON.parse(routeData);
          const departmentIdToUpdate = departmentData.id;
          console.log(departmentIdToUpdate);
          this.service.updateDepartment(departmentIdToUpdate, updatedDepartment).subscribe(
            (response) => {
              this.openSnackBar("Department Updated");
              console.log(response);
              //this.dialogRef.close();
            });
        }
      }
      else {
        console.log();
        
        if (this.isEditMode) {
          const updatedDepartment: Department = this.form.value;
          console.log(updatedDepartment);
          const departmentIdToUpdate = this.data.department.id;
          console.log(departmentIdToUpdate);
          this.service.updateDepartment(departmentIdToUpdate, updatedDepartment).subscribe(
            (response) => {
              this.openSnackBar("Department Updated");
              console.log(response);
              this.dialogRef.close();
            });
        } else {
          this.department = this.form.value;
          this.service.postDepartment(this.department).subscribe((res) => {
            console.log(res);
            this.openSnackBar("Department Added");
          });
        }
      }
    } 
    else {
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

  openFailedSnackBar(): void {
    this.snackBar.open('Password do not Match', 'Dismiss', {
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


