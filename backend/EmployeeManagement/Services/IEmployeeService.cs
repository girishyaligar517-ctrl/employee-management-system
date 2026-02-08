using EmployeeManagement.DTOs;

namespace EmployeeManagement.Services
{
    public interface IEmployeeService
    {
        Task<List<EmployeeDto>> GetEmployees();
        Task<UpdateEmployeeDto> GetEmployeeById(int id);
        Task AddEmployee(CreateEmployeeDto dto);
        Task UpdateEmployee(UpdateEmployeeDto dto);
        Task DeleteEmployee(int id);
    }
    
   
}
