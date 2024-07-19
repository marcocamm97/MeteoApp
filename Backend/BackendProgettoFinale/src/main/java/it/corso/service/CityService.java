package it.corso.service;

import it.corso.dto.CityDto;

public interface CityService {
    double getCurrentTemperature(CityDto cityDto);
}
