
import {RouterLink} from "@angular/router";
import { Component, Output, EventEmitter } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {WeatherService} from "../services/weather.service";
import {InteractiveService} from "../services/interactive.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  city: string = '';
  @Output() weatherData = new EventEmitter<any>();


  constructor(private weatherService: WeatherService, private weatherDataService: InteractiveService) {}


  searchWeather() {
    if (this.city) {
      this.weatherService.getCityCoordinates(this.city).subscribe(response => {
        if (response.results && response.results.length > 0) {
          const {latitude, longitude} = response.results[0];
          this.weatherService.getWeatherData(latitude, longitude).subscribe(data => {
            data.cityName = this.city;
            this.weatherDataService.updateWeatherData(data);
            });
          }
        });
      }
    }
  }
