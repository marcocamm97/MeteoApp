import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private geocodingApiUrl = 'https://geocoding-api.open-meteo.com/v1/search?name=';
  private weatherApiUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) { }

  getCityCoordinates(city: string): Observable<any> {
    return this.http.get<any>(`${this.geocodingApiUrl}${city}`);
  }

  getWeatherData(latitude: number, longitude: number): Observable<any> {
    return this.http.get<any>(`${this.weatherApiUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
      .pipe(
        map(data => ({
          temperature: data.current_weather?.temperature || null,
          windSpeed: data.current_weather?.windspeed || null,

        })),
        catchError(error => {
          console.error('Error fetching weather data', error);
          return of(null);
        })
      );
  }
}
