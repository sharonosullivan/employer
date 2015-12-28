package com.example.entity;

public class Employer {

  private int id;
  private String name;
  private boolean active;
  private int departmentId;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public boolean isActive() {
    return active;
  }

  public void setActive(boolean active) {
    this.active = active;
  }

  public int getDepartmentId() {
    return departmentId;
  }

  public void setDepartmentId(int departmentId) {
    this.departmentId = departmentId;
  }

  @Override public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;

    Employer employer = (Employer) o;

    if (id != employer.id)
      return false;
    if (active != employer.active)
      return false;
    if (departmentId != employer.departmentId)
      return false;
    return !(name != null ? !name.equals(employer.name) : employer.name != null);

  }

  @Override public int hashCode() {
    int result = id;
    result = 31 * result + (name != null ? name.hashCode() : 0);
    result = 31 * result + (active ? 1 : 0);
    result = 31 * result + departmentId;
    return result;
  }
}
