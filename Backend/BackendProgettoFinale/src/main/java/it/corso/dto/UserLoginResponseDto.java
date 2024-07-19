package it.corso.dto;

import java.time.LocalDateTime;
import java.util.Date;

public class UserLoginResponseDto {

	private String token;
	private Date ttl;
	private Date tokenCreationTime;
	
	
	//getters and setters
	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public Date getTtl() {
		return ttl;
	}
	public void setTtl(Date end) {
		this.ttl = end;
	}
	public Date getTokenCreationTime() {
		return tokenCreationTime;
	}
	public void setTokenCreationTime(Date creation) {
		this.tokenCreationTime = creation;
	}
	

	
	
	
}
