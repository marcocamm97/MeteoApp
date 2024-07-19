package it.corso.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import it.corso.dto.CityDto;

@Service
public class CityServiceImpl implements CityService {

    private final RestTemplate restTemplate;

    @Value("${weather.api.url}")
    private String weatherApiUrl;

    @Value("${weather.api.parameters}")
    private String weatherApiParameters;

    public CityServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public double getCurrentTemperature(CityDto cityDto) {
     
        String url = String.format("%s?latitude=%f&longitude=%f&%s&current_weather=true",
                weatherApiUrl, cityDto.getLatitude(), cityDto.getLongitude(), weatherApiParameters);

        try {
            String response = restTemplate.getForObject(url, String.class);
            if (response == null || response.isEmpty()) {
                throw new RuntimeException("Empty response from weather API.");
            }

            System.out.println("Response from API: " + response);

            JSONObject jsonResponse = new JSONObject(response);

            if (jsonResponse.has("current_weather")) {
                JSONObject currentWeather = jsonResponse.getJSONObject("current_weather");
                return currentWeather.getDouble("temperature");
            } else {
                throw new RuntimeException("Non sono presenti informazioni sulla temperatura corrente");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Errore: " + e.getMessage(), e);
        }
    }
}
