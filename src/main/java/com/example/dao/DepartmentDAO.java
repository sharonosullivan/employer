package com.example.dao;

import com.example.constants.Queries;
import com.example.entity.Department;
import com.example.mapper.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentDAO {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Autowired
  private Mapper mapper;

  public List<Department> loadDepartments() throws Exception{
    return jdbcTemplate
      .query(
        Queries.LOAD_DEPARTMENTS,
        mapper::mapDepartment);
  }

}
