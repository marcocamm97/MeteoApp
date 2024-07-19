package it.corso.controller;

import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import it.corso.dto.UserDto;
import it.corso.dto.UserLoginRequestDto;
import it.corso.dto.UserLoginResponseDto;
import it.corso.model.User;
import it.corso.service.UserService;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Component
@Path("/utente")
public class UserController {

    @Autowired
    private UserService userService;
    
    
    @POST
    @Path("/reg")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response userRegistration(@Valid UserDto userDto) {
        try {
            
            if (!Pattern.matches("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,20}", userDto.getPassword())) {
                System.out.println("La password non corrisponde ai criteri richiesti");
                return Response.status(Response.Status.BAD_REQUEST).build();
            }

            
            if (userService.existUserByEmail(userDto.getEmail())) {
                System.out.println("L'email esiste già nel sistema");
                return Response.status(Response.Status.BAD_REQUEST).build();
            }

      
            userService.userRegistration(userDto);
            return Response.ok().build();
        } catch (Exception e) {
            System.out.println("Errore durante la registrazione dell'utente: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(UserLoginRequestDto userLoginRequestDto) {
        try {
            System.out.println("Login request received: " + userLoginRequestDto.getEmail());

            if (userLoginRequestDto.getEmail() == null || userLoginRequestDto.getPassword() == null) {
                System.out.println("Email or password is null");
                return Response.status(Response.Status.BAD_REQUEST).entity("Email and password are required.").build();
            }

            if (userService.Login(userLoginRequestDto)) {
                System.out.println("Login successful for: " + userLoginRequestDto.getEmail());
                return Response.ok(issueToken(userLoginRequestDto.getEmail())).build();
            } else {
                System.out.println("Invalid email or password for: " + userLoginRequestDto.getEmail());
                return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid email or password.").build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("An error occurred while processing the request.").build();
        }
    }

    private UserLoginResponseDto issueToken(String email) {
        byte[] secret = "asjkfqelkfsgsressgeegelfwhkqmqwfkjhqkqkjehnjfjkhqwewf9999".getBytes();
        Key key = Keys.hmacShaKeyFor(secret);

        User user = userService.getUserByEmail(email);
        Map<String, Object> claims = new HashMap<>();
        claims.put("nome", user.getName());
        claims.put("cognome", user.getLastname());
        claims.put("email", email);

        Date now = new Date();
        Date expiration = Date.from(LocalDateTime.now().plusMinutes(15).atZone(ZoneId.systemDefault()).toInstant());

        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuer("http://localhost:8080")
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(key)
                .compact();

        UserLoginResponseDto response = new UserLoginResponseDto();
        response.setToken(token);
        response.setTokenCreationTime(now);
        response.setTtl(expiration);

        return response;
    }
}
