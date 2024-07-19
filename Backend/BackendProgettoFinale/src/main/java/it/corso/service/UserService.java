package it.corso.service;

import java.util.Optional;

import it.corso.dto.UserLoginRequestDto;
import it.corso.dto.UserLoginResponseDto;
import it.corso.dto.UserDto;
import it.corso.model.User;

public interface UserService {
	
	boolean Login(UserLoginRequestDto userLoginRequestDto);

	User getUserByEmail(String email);
	
	public void userRegistration(UserDto userDto);

	boolean existUserByEmail(String email);
	
	//UserLoginResponseDto issueToken(String email);

	//Optional<User> findByEmail(String email);
}
