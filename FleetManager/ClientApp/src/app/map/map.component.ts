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
  getColor(speed: Number){
    if(speed>=100) return '#BF0012' //Dark Red
    if(speed>=90 && speed<100) return '#BE1701' //Red
    if(speed>=80 && speed<90) return '#BC6703' //Dark Orange
    if(speed>=70 && speed<80) return '#BC8E04' //Dark Orange
    if(speed>50 && speed<70) return '#BBB405' //Dark Green
    if(speed>0 && speed <= 50) return '#75BA07' //Green
    if(speed==0) return '#6B6B6B' //Gray
  }
}
