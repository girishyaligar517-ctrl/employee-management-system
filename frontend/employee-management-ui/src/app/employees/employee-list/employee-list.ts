import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../Services/employee';
import { Employee } from '../../Models/employee';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './employee-list.html'
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private service: EmployeeService,private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.service.getEmployees().subscribe({
      next: data => {this.employees = data; this.cdr.detectChanges();},
      error: err => alert(err.error.message)
    });
  }

  delete(id: number) {
    if (confirm('Delete employee?')) {
      this.service.deleteEmployee(id).subscribe({
        next: () => this.loadEmployees(),
        error: err => alert(err.error.message)
      });
    }
    this.loadEmployees();
  }
}
