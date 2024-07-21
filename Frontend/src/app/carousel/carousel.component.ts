import { Component, OnInit, Input } from '@angular/core';
import {InteractiveService} from "../services/interactive.service";

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})

export class CarouselComponent implements OnInit {
  currentTemperature: string = '';

  constructor(private weatherDataService: InteractiveService) {}

  ngOnInit() {
    this.weatherDataService.weatherData$.subscribe(data => {
      if (data) {
        this.currentTemperature = `Temperatura attuale a ${data.cityName}: ${data.temperature}°C`;
      }
    });
  }
}
