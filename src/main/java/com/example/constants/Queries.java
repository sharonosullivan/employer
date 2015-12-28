package com.example.constants;

public interface Queries {

  //Employees table
  String INSERT_NEW_EMPLOYER =
      "INSERT INTO tblEmployees (empName, empActive, emp_dpID) VALUES (?,?,?);";
  String UPDATE_EMPLOYER =
      "UPDATE tblEmployees SET empName = ?, empActive = ?, emp_dpID = ? WHERE empID = ?;";
  String DELETE_EMPLOYER = "DELETE FROM tblEmployees WHERE empID = ?;";
  String LOAD_EMPLOYEES = "SELECT*FROM tblemployees %s LIMIT ?, ?;";
  String COUNT_OF_EMPLOYEES = "SELECT count(*) as count from tblemployees %s;";

  //Departments table
  String LOAD_DEPARTMENTS = "SELECT*FROM tblDepartments;";

}
