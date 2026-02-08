using EmployeeManagement.DTOs;
using EmployeeManagement.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _service;

        public EmployeesController(IEmployeeService service)
        {
            _service = service;
        }

        // GET: api/employees
        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var result = await _service.GetEmployees();
            return Ok(result); // 200
        }

        // GET: api/employees/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var employee = await _service.GetEmployeeById(id);
            return Ok(employee); // 200
        }


        // POST: api/employees
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateEmployeeDto dto)
        {
            await _service.AddEmployee(dto);
            return StatusCode(StatusCodes.Status201Created,
                new { message = "Employee added successfully" }); // 201
        }

        // PUT: api/employees
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateEmployeeDto dto)
        {
            await _service.UpdateEmployee(dto);
            return Ok(new { message = "Employee updated successfully" }); // 200
        }

        // DELETE: api/employees/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteEmployee(id);
           //return NoContent(); // 204
           return Ok( new { message="Employee Deleted Successfully"});
        }
    }
}
