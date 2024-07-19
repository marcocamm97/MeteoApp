package it.corso.jwt;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.ws.rs.NameBinding;

@NameBinding
//Questa annotation specifica che l'annotation personalizzata SECURED dev'essere convertita in fase di runtime
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface Secured {
	String role() default "all"; //significa che tutti quanti possono accedere
	}
