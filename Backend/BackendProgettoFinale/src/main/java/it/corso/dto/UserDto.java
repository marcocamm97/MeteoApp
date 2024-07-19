package it.corso.dto;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class UserDto {

	@Id
	@GeneratedValue
	private int id;
	private String name;
	
	
	private String lastname;
	
	
	private String email;
	

	private String password;
	
	private List<String> roleIds;
	private List<String> courseIds;

	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setFirstname(String name) {
		this.name = name;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public List<String> getRoleIds() {
		return roleIds;
	}
	public void setRoleIds(List<String> roleIds) {
		this.roleIds = roleIds;
	}
	public List<String> getCourseIds() {
		return courseIds;
	}
	public void setCourseIds(List<String> courseIds) {
		this.courseIds = courseIds;
	}

}
