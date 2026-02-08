import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../Services/employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-edit.html',
  styleUrl: './employee-edit.css',
})
export class EmployeeEditComponent implements OnInit {

  employeeId!: number;

  employeeForm;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.nonNullable.group({
      employeeId: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: [0, [Validators.required, Validators.min(1)]],
      departmentId: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));

    this.employeeService.getEmployeeById(this.employeeId).subscribe(data => {
      this.employeeForm.patchValue(data);
    });
  }

  submit() {
    if (this.employeeForm.invalid) return;

    this.employeeService.updateEmployee(this.employeeForm.getRawValue()).subscribe({
      next: () => {
        alert('Employee updated successfully');
        this.router.navigate(['/']);
      },
      error: () => alert('Update failed')
    });
  }
}