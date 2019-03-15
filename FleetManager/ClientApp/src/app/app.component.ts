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

  constructor(private map: MapsService) {

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
    this.lat=52.4173;
    this.lng=16.9647;
    this.lat2=52.423;
    this.lng2=16.9547;
    console.log(this.lat,this.lng);
  }
}
