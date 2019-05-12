import { CarService } from './car.service';
import { CarData } from './carData';
import { GPSCoordinates } from './gpsCoordinates';
import { GpsService } from './gps.service';
import { MapsService } from './maps.service';
import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';


import 'hammerjs';
import { Car } from './car';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Fleet Manager';
  userName:String=null;
  constructor( private authService: AuthService) {  }
  
  ngOnInit(){ 
    console.log("test")
    this.authService.getUserName().subscribe(res => {console.log(res); 
      this.userName = res});
   }
  

}
