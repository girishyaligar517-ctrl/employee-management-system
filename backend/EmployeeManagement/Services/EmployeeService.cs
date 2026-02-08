using EmployeeManagement.DTOs;
using EmployeeManagement.Models;
using EmployeeManagement.Repositories;

namespace EmployeeManagement.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _repo;

        public EmployeeService(IEmployeeRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<EmployeeDto>> GetEmployees()
        {
            var employees = await _repo.GetAllAsync();

            return employees.Select(e => new EmployeeDto
            {
                EmployeeId = e.EmployeeId,
                FullName = e.FirstName + " " + e.LastName,
                Email = e.Email,
                Salary = e.Salary,
                DepartmentName = e.Department.DepartmentName
            }).ToList();
        }

        public async Task AddEmployee(CreateEmployeeDto dto)
        {
            var emp = new Employee
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Salary = dto.Salary,
                DepartmentId = dto.DepartmentId
            };

            await _repo.AddAsync(emp);
        }

        public async Task<UpdateEmployeeDto> GetEmployeeById(int id)
        {
            var emp = await _repo.GetByIdAsync(id);
            if (emp == null)
                throw new KeyNotFoundException("Employee not found");

            return new UpdateEmployeeDto
            {
                EmployeeId = emp.EmployeeId,
                FirstName = emp.FirstName,
                LastName = emp.LastName,
                Email = emp.Email,
                Salary = emp.Salary ?? 0,
                DepartmentId = emp.DepartmentId ?? 0
            };
        }



        public async Task UpdateEmployee(UpdateEmployeeDto dto)
        {
            var emp = await _repo.GetByIdAsync(dto.EmployeeId);
            if (emp == null) throw new KeyNotFoundException("Employee not found");

            emp.FirstName = dto.FirstName;
            emp.LastName = dto.LastName;
            emp.Email = dto.Email;
            emp.Salary = dto.Salary;
            emp.DepartmentId = dto.DepartmentId;

            await _repo.UpdateAsync(emp);
        }

        public async Task DeleteEmployee(int id)
        {
            await _repo.DeleteAsync(id);
        }
    }
}
