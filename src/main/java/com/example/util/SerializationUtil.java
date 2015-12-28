package com.example.util;

import com.example.entity.Department;
import com.example.entity.Employer;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;

public class SerializationUtil {

  private SerializationUtil(){
    throw new UnsupportedOperationException();
  }

  public static JSONArray serializeEmployees(List<Employer> employees){
    JSONArray result = new JSONArray();
    for(Employer employer : employees){
      JSONObject employerJson = new JSONObject();
      employerJson.put("id", employer.getId());
      employerJson.put("name", employer.getName());
      employerJson.put("active", employer.isActive());
      employerJson.put("departmentId", employer.getDepartmentId());
      result.put(employerJson);
    }
    return result;
  }

  public static JSONArray serializeDepartments(List<Department> departments){
    JSONArray result = new JSONArray();
    for(Department department : departments){
      JSONObject departmentJson = new JSONObject();
      departmentJson.put("id", department.getId());
      departmentJson.put("name", department.getName());
      result.put(departmentJson);
    }
    return result;
  }

}
