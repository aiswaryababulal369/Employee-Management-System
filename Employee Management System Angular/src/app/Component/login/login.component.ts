import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { AuthicationServiceService } from 'src/app/Services/authication-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  adminUserName: string = "aish";
  adminPassword: string = "369";
  errorMessage: string = "";

  constructor(private formBuilder: FormBuilder, private router: Router, private service: AuthicationServiceService,private snackBar: MatSnackBar) {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  submitted = false;



  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      });

  }

  get f() {
    return this.form.controls;
  }

  checkUser(res: any) {
    let user = res.find(
      (user: any) =>
        user.username === this.form.controls['username'].value &&
        user.password === this.form.controls['password'].value,
    );
    return user;
  }


  onLogin(): void {
    this.submitted = true;
    this.service.getDepartments()
      .subscribe((response: any) => {
        const department = this.checkUser(response)
        
        if (!!department) {
          this.openSuccessSnackBar();
          this.router.navigate(['departmentdashboard', { department: JSON.stringify(department) }]);
        }
        else {
          this.service.getEmployees()
            .subscribe((response: any) => {
              const employee = this.checkUser(response)
              if (!!employee) {
                this.openSuccessSnackBar();
                this.router.navigate([`employeedashboard`,{ employee: JSON.stringify(employee) }]);
                console.log(employee);
              }
              else {
                if (this.form.controls['username'].value === this.adminUserName && this.form.controls['password'].value === this.adminPassword) {
                  this.openSuccessSnackBar();
                  this.router.navigate(['admindashboard']);
                }

                else {
                  this.errorMessage = "Invalid user Credentials";
                  this.openSnackBar();
                }
              }
            });
        }
      });
  }
  openSnackBar() {
    this.snackBar.open('Invalid user credentials', 'Dismiss', {
      duration: 3000,  // Duration for which the snackbar will be displayed (in milliseconds)
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  openSuccessSnackBar() {
    this.snackBar.open('Logged Successfully', 'Dismiss', {
      duration: 3000,  // Duration for which the snackbar will be displayed (in milliseconds)
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
