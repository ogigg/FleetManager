import { Component, OnInit, Input } from '@angular/core';
import { CarData } from '../carData';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() cars : CarData[]=[];
  @Input() focusLatitude: Number = 52.40973;
  @Input() focusLongitude: Number = 16.955353;
  mapType: String ="roadmap";   
  
  
  constructor() {}

  ngOnInit() {
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
    console.log(this.cars)
  }

}
