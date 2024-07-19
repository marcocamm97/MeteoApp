package it.corso.controller;

import it.corso.dto.CityDto;
import it.corso.service.CityService;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Path("/weather")
public class CityController {

    private final CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GET
    @Path("/temperature")
    public Response getCurrentTemperature(
            @QueryParam("latitude") double latitude,
            @QueryParam("longitude") double longitude) {

        CityDto cityDto = new CityDto(latitude, longitude);

        try {
            double temperature = cityService.getCurrentTemperature(cityDto);
            return Response.ok(temperature).build();
        } catch (RuntimeException e) {
            // Log the exception details (optional)
            System.err.println("Error occurred: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("Error fetching temperature")
                           .build();
        }
    }
}
