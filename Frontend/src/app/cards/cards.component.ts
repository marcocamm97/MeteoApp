import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {WeatherService} from "../services/weather.service";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

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
  northcities = [
    { name: "Milano", temperature: "", latitude: 45.4642, longitude: 9.19, image: "milano.webp" },
    { name: "Venezia", temperature: "", latitude: 45.4408, longitude: 12.3155, image: "venezia.webp" },
    { name: "Torino", temperature: "", latitude: 45.0703, longitude: 7.6869, image: "torino.jpg" },
  ];

  centercities = [
    { name: "Roma", temperature: "", latitude: 41.9028, longitude: 12.4964, image: "roma.jpg" },
    { name: "Firenze", temperature: "", latitude: 43.7696, longitude: 11.2558, image: "firenze.webp" },
    { name: "L'Aquila", temperature: "", latitude: 42.3498, longitude: 13.4006, image: "laquila.webp" },
  ];

  southcities = [
    { name: "Palermo", temperature: "", latitude: 38.1157, longitude: 13.3615, image: "pmo.jpg" },
    { name: "Napoli", temperature: "", latitude: 40.8522, longitude: 14.2681, image: "nap.jpg" },
    { name: "Cagliari", temperature: "", latitude: 39.2238, longitude: 9.1217, image: "cagliari.jpg" },
  ];

  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.updateCitiesTemperature();
  }

  updateCitiesTemperature() {
    this.fetchTemperatureData('northcities', this.northcities);
    this.fetchTemperatureData('centercities', this.centercities);
    this.fetchTemperatureData('southcities', this.southcities);
  }

  fetchTemperatureData(region: string, cities: any[]) {
    cities.forEach(city => {
      this.http.get<any>(`http://localhost:8080/api/weather/temperature?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`)
        .subscribe({
          next: data => city.temperature = `${data.temperature} °C`,
          error: error => console.error(`Error fetching temperature for ${city.name}:`, error)
        });
    });
  }

  filterCities(searchTerm: string) {
    const lowerSearchTerm = searchTerm.toLowerCase();

    this.northcities = this.northcities.filter(city => city.name.toLowerCase().includes(lowerSearchTerm));
    this.centercities = this.centercities.filter(city => city.name.toLowerCase().includes(lowerSearchTerm));
    this.southcities = this.southcities.filter(city => city.name.toLowerCase().includes(lowerSearchTerm));
  }

  onSearchTermChanged(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filterCities(this.searchTerm);
  }
}
