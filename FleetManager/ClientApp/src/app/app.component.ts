import { CarService } from './car.service';
import { CarData } from './carData';
import { GPSCoordinates } from './gpsCoordinates';
import { GpsService } from './gps.service';
import { MapsService } from './maps.service';
import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';


import 'hammerjs';
import { Car } from './car';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Fleet Manager';

  constructor(private map: MapsService, private gpsService: GpsService, private carsService: CarService) {  }

  ngOnInit(){  }

}
