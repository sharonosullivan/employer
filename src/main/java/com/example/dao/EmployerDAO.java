package com.example.dao;

import com.example.constants.ProjectConstants;
import com.example.constants.Queries;
import com.example.entity.Employer;

import com.example.entity.Search;
import com.example.mapper.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployerDAO {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Autowired
  private Mapper mapper;

  public void saveEmployer(Employer employer) throws Exception {
    jdbcTemplate
      .update(
        Queries.INSERT_NEW_EMPLOYER,
        employer.getName(),
        employer.isActive(),
        employer.getDepartmentId());
  }

  public void updateEmployer(Employer employer) throws Exception {
    jdbcTemplate
      .update(
        Queries.UPDATE_EMPLOYER,
        employer.getName(),
        employer.isActive(),
        employer.getDepartmentId(),
        employer.getId());
  }

  public void deleteEmployer(int id) throws Exception {
    jdbcTemplate.update(Queries.DELETE_EMPLOYER, id);
  }

  public List<Employer> loadEmployees(Search search) throws Exception {
    if(search.getFilter() == null || search.getFilter().isEmpty()){
      return jdbcTemplate
          .query(
            String.format(Queries.LOAD_EMPLOYEES, ""),
            mapper::mapEmployer, search.getNewPosition(),
            ProjectConstants.ROWS_PER_PAGE);
    }else{
      return jdbcTemplate
          .query(
            String.format(Queries.LOAD_EMPLOYEES, ProjectConstants.FILTER_FOR_QUERY),
            mapper::mapEmployer, search.getFilter() + "%", search.getNewPosition(),
            ProjectConstants.ROWS_PER_PAGE);
    }
  }

  public int countOfEmployees(String filter) throws Exception {
    if(filter == null || filter.isEmpty()){
      return jdbcTemplate
        .queryForObject(
          String.format(Queries.COUNT_OF_EMPLOYEES, ""),
          Integer.class);
    }else{
      return jdbcTemplate
        .queryForObject(
          String.format(Queries.COUNT_OF_EMPLOYEES, ProjectConstants.COUNT_FILTERED),
          Integer.class,
          filter + "%");
    }
  }

}
