namespace EmployeeManagement.DTOs
{
    public class EmployeeDto
    {
        public int EmployeeId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public decimal? Salary { get; set; }
        public string DepartmentName { get; set; }
    }
}
