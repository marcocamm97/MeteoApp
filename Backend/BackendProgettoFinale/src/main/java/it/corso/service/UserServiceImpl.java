package it.corso.service;

import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.codec.digest.DigestUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import it.corso.dao.UserDao;
import it.corso.dto.UserDto;
import it.corso.dto.UserLoginRequestDto;
import it.corso.dto.UserLoginResponseDto;
import it.corso.model.User;


@Service
public class UserServiceImpl implements UserService {

	
	@Autowired
	private UserDao userDao;
	
    @Autowired
    private ModelMapper modelMapper;
	
	
	   @Override
	    public void userRegistration(UserDto userDto) {
	        User user = modelMapper.map(userDto, User.class);
	        String sha256hex = DigestUtils.sha256Hex(userDto.getPassword());
	        user.setPassword(sha256hex);
	        userDao.save(user);
	    }
	
	
	@Override
	public boolean Login(UserLoginRequestDto userLoginRequestDto) {
        String password = DigestUtils.sha256Hex(userLoginRequestDto.getPassword());
        Optional<User> optional = userDao.findByEmailAndPassword(userLoginRequestDto.getEmail(), password);
        return optional.isPresent();
	}

	 @Override
	    public boolean existUserByEmail(String email) {
	        return userDao.findByEmail(email).isPresent();
	    }
	
	@Override
	public User getUserByEmail(String email) {
		Optional<User> userOptionalDb = userDao.findByEmail(email);
		
		if(!userOptionalDb.isPresent()) {
			
			return new User();
		}
		
		return userOptionalDb.get();
	}


	
	
}
