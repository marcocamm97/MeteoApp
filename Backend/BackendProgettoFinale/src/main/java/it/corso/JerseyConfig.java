package it.corso;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

import jakarta.ws.rs.ApplicationPath;

/* JAX-RS è una specifica Java per creare servizi Web RESTful. E' parte della Java EE ed è inserita 
 * dentro Jakarta EE.
 * Jersey è un'implementazione di riferimento di JAX-RS.
 */

@Component
@ApplicationPath("api")
public class JerseyConfig extends ResourceConfig{

	public JerseyConfig() {
		
		packages("it.corso");
		
	}
	
}
