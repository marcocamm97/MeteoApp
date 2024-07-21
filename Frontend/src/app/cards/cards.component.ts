import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {WeatherService} from "../services/weather.service";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

interface City {
  name: string;
  image: string;
  temperature?: number;
  windSpeed?: number;

}

@Component({
  selector: 'app-cards',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})



export class CardsComponent implements OnInit {
  northcities: City[] = [
    { name: "Milano", image: "milano.webp" },
    { name: "Venezia", image: "venezia.webp" },
    { name: "Torino", image: "torino.jpg" },
  ];

  centercities: City[] = [
    { name: "Roma", image:"roma.jpg" },
    { name: "Firenze", image: "firenze.webp" },
    { name: "L'Aquila", image: "laquila.webp" },
  ];

  southcities: City[] = [
    { name: "Palermo", image: "pmo.jpg" },
    { name: "Napoli", image: "nap.jpg" },
    { name: "Cagliari", image: "cagliari.jpg" },
  ];

  searchTerm: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.fetchTemperatures();
  }

  fetchTemperatures() {
    const allCities = [...this.northcities, ...this.centercities, ...this.southcities];

    allCities.forEach(city => {
      this.weatherService.getCityCoordinates(city.name).subscribe(response => {
        if (response.results && response.results.length > 0) {
          const { latitude, longitude } = response.results[0];
          this.weatherService.getWeatherData(latitude, longitude).subscribe(data => {
            city.temperature = data.temperature;
            city.windSpeed = data.windSpeed;

          });
        }
      });
    });
  }
}
