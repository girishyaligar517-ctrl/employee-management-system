import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Models/employee';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  private apiUrl = 'https://localhost:7092/api/Employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(this.apiUrl, employee);
  }
  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getEmployeeById(id:number)
  {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateEmployee(data:any)
  {
    return this.http.put(this.apiUrl,data);
  }

}
