import { Component } from '@angular/core';
import { WeatherService} from "../services/weather.service";
import {FormsModule, NgForm} from '@angular/forms';
import {JsonPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule, NgIf, JsonPipe],
  templateUrl: 'weather.component.html'

  ,
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  city: string = '';
  temperature: number | null = null;

  constructor(private weatherService: WeatherService) {}

  searchWeather() {
    this.weatherService.getCityCoordinates(this.city).subscribe(response => {
      if (response.results && response.results.length > 0) {
        const { latitude, longitude } = response.results[0];
        this.weatherService.getWeatherData(latitude, longitude).subscribe(temp => {
          this.temperature = temp;
        });
      } else {
        this.temperature = null;
      }
    }, error => {
      console.error('Error fetching city coordinates', error);
      this.temperature = null;
    });
  }
}
