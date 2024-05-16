import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../Model/Department';
import { Employee } from '../Model/Employee';
import { Observable } from 'rxjs';
  

@Injectable({
  providedIn: 'root'
})
export class AuthicationServiceService {

  private url = 'http://localhost:3000';
   
  constructor(private httpClient: HttpClient) { }
  
  getEmployees(){
    return this.httpClient.get(this.url + '/employee');
  }

  getDepartments(){
    return this.httpClient.get(this.url + '/department');
  }
  postDepartment(department: Department) {
    return this.httpClient.post(this.url + '/department', department);
  }

  getStates(){
    return this.httpClient.get(this.url + '/states');
  }

  postEmployee(employee :Employee){
    return this.httpClient.post(this.url + '/employee', employee);
  }

  getEmployeesByDepartmentId(departmentId: number): Observable<Employee[]> {
    const url = `${this.url}/employee?departmentId=${departmentId}`;
    return this.httpClient.get<Employee[]>(url);
  }


  deleteDepartment(departmentId: number): Observable<void> {
    this.getEmployeesByDepartmentId(departmentId).subscribe((employees: Employee[]) => {
      employees.forEach(employee => {
        this.deleteEmployee(employee.id).subscribe(() => {
        });
      });
      this.httpClient.delete<void>(`${this.url}/department/${departmentId}`).subscribe(() => {
      });
    });
    return new Observable();
  }

  deleteEmployee(employeeId:number):Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/employee/${employeeId}`);
  }

  updateEmployee(employeeId: number, updatedEmployee: Employee): Observable<any> {
  const url = `${this.url}/employee/${employeeId}`;
  return this.httpClient.put(url, updatedEmployee);
}

updateDepartment(departmentId: number, updatedDepartment: Department): Observable<any> {
  const url = `${this.url}/department/${departmentId}`;
  return this.httpClient.put(url, updatedDepartment);
}

getEmployeeByEmployeeId(employeeId: number): Observable<Employee> {
  const url = `${this.url}/employee/${employeeId}`;
  return this.httpClient.get<Employee>(url);
}

getDepartmentByDepartmentId(departmentId:number):Observable<Department>{
  const url = `${this.url}/department/${departmentId}`;
  return this.httpClient.get<Department>(url);
}
  
}
