package it.corso.jwt;

import java.io.IOException;
import java.util.List;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import jakarta.ws.rs.NotAuthorizedException;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.container.ResourceInfo;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;

@JWTTokenNeeded
@Provider

public class JWTTokenNeededFilter implements ContainerRequestFilter {
	
	@Context
	private ResourceInfo resourceInfo;

	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {
		Secured annotatedRole = resourceInfo.getResourceMethod().getAnnotation(Secured.class);
		if(annotatedRole == null) {
			annotatedRole = resourceInfo.getResourceClass().getAnnotation(Secured.class);
		}
		String authorizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
		
		//if per vedere se c'è il token e se inizia con "Bearer "
		if(authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
			throw new NotAuthorizedException("Dev'essere fornito un header di autorizzazione");
		}
		
		authorizationHeader.substring("Bearer".length()).trim();
		
		try {
			byte[] secret = "asjkfqelkfsgsressgeegelfwhkqmqwfkjhqkqkjehnjfjkhqwewf9999".getBytes();
			Key key = Keys.hmacShaKeyFor(secret);
			
			Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(authorizationHeader);
			Claims body = claims.getBody();
			List <String> rolesToken = body.get("ruoli", List.class);
			
			Boolean hasRole = false;
			
			for (String role : rolesToken) {
				if(role.equals(annotatedRole.role())) {
					hasRole = true; 
				}
			}
			
			if(!hasRole) {
				requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
			}
		}
		
		catch(Exception e) {
			requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
		}
	}

	
	
}
