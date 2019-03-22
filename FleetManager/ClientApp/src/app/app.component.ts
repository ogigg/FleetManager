import { GPSCoordinates } from './gpsCoordinates';
import { GpsService } from './gps.service';
import { MapsService } from './maps.service';
import { Component } from '@angular/core';
import 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Fleet Manager';
  mapType: String ="roadmap";
  lat: Number;
  lng: Number;
  
  lat2: Number;
  lng2: Number;
  location: Object ="";
  coordinates: GPSCoordinates[]=[];

  constructor(private map: MapsService, private gpsService: GpsService) {

  }

  onGetAllGPS(){
    this.gpsService.getCoordinates().subscribe(r=>console.log(r)
    )
  }
  onSatelite(){
    this.mapType="satellite"
    console.log(this.mapType)
  }
  onRoadMap(){
    this.mapType="roadmap"
    console.log(this.mapType)
  }
  onHybrid(){
    this.mapType="hybrid"
    console.log(this.mapType)
  }
  ngOnInit(){
    this.onGetAllGPS();
    this.lat=52.4173;
    this.lng=16.9647;
    this.lat2=52.423;
    this.lng2=16.9547;
    console.log(this.lat,this.lng);
  }
}
