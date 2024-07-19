package it.corso.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public class CityDto {
	
	@Id
	@GeneratedValue
    private int id;
	
    private double latitude;
    private double longitude;
    private String name;

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

	public CityDto() {
    }

    public CityDto(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}
