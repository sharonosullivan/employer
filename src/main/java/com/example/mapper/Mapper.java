package com.example.mapper;

import com.example.entity.Department;
import com.example.entity.Employer;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Service
public class Mapper {

  public Employer mapEmployer(ResultSet rs, int rowNum) throws SQLException {
    Employer employer = new Employer();
    employer.setId(rs.getInt("empID"));
    employer.setName(rs.getString("empName"));
    employer.setActive(rs.getBoolean("empActive"));
    employer.setDepartmentId(rs.getInt("emp_dpID"));
    return employer;
  }

  public Department mapDepartment(ResultSet rs, int rowNum) throws SQLException {
    return new Department(rs.getInt("dpID"), rs.getString("dpName"));
  }

}
