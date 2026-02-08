import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../../Services/employee';
import { Router } from '@angular/router';
import { CreateEmployee } from '../../DTO/CreateEmployee';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-add.html',
  styleUrl: './employee-add.css'
})
export class EmployeeAddComponent {


  employeeForm;
  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router)
  {
     this.employeeForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    salary: [0, [Validators.required, Validators.min(1)]],
    departmentId: [0, Validators.required]
  });
  }
   

 

  

  submit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    };
    const payload:CreateEmployee=this.employeeForm.getRawValue() as CreateEmployee ;
    this.employeeService.addEmployee(payload).subscribe({
      next: () => {
        alert('Employee added successfully');
        this.router.navigate(['/']);
      },
      error: err => alert('Error adding employee')
    });
  }
}
