package com.example.controller;

import com.example.constants.ProjectConstants;
import com.example.dao.DepartmentDAO;
import com.example.dao.EmployerDAO;
import com.example.entity.Department;
import com.example.entity.Employer;

import com.example.entity.Search;
import com.example.util.SerializationUtil;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/employer")
public class EmployerController {

  @Autowired
  EmployerDAO employerDAO;
  @Autowired
  DepartmentDAO departmentDAO;

  @RequestMapping(value = "/save", method = RequestMethod.POST)
  private String saveNewEmployer(Employer employer){
    try {
      if(employer.getName() == null || employer.getName().isEmpty()){
        return new JSONObject().put("error", true).put("message", "Name can't be empty").toString();
      }
      employerDAO.saveEmployer(employer);
      return new JSONObject().put("error", false).toString();
    } catch (Exception e) {
      return new JSONObject().put("error", true).put("message", "Problems with saving new employer").toString();
    }
  }

  @RequestMapping(value = "/update", method = RequestMethod.POST)
  private String updateEmployer(Employer employer){
    try {
      if(employer.getName() == null || employer.getName().isEmpty()){
        return new JSONObject().put("error", true).put("message", "Name can't be empty").toString();
      }
      employerDAO.updateEmployer(employer);
      return new JSONObject().put("error", false).toString();
    } catch (Exception e) {
      return new JSONObject().put("error", true)
          .put("message", "Problems with updating employer : " + employer.getName()).toString();
    }
  }

  @RequestMapping(value = "/delete", method = RequestMethod.POST)
  private String deleteEmployer(int id){
    try {
      employerDAO.deleteEmployer(id);
      return new JSONObject().put("error", false).toString();
    } catch (Exception e) {
      return new JSONObject().put("error", true)
          .put("message", "Problems with deleting employer").toString();
    }
  }

  @RequestMapping("/load")
  private String loadRecords(Search search){
    try {
      List<Employer> employees = employerDAO.loadEmployees(search);
      List<Department> departments = departmentDAO.loadDepartments();
      return new JSONObject().put("error", false)
          .put("employees", SerializationUtil.serializeEmployees(employees))
          .put("amount", employerDAO.countOfEmployees(search.getFilter()))
          .put("departments", SerializationUtil.serializeDepartments(departments))
          .put("amountPerPage", ProjectConstants.ROWS_PER_PAGE)
          .toString();
    }catch (Exception e){
      e.printStackTrace();
      return new JSONObject().put("error", true).put("message", "Problems with loading records").toString();
    }
  }

}
