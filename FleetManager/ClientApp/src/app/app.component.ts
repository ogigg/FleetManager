import { CarService } from './car.service';
import { CarData } from './carData';
import { GPSCoordinates } from './gpsCoordinates';
import { GpsService } from './gps.service';
import { MapsService } from './maps.service';
import { Component } from '@angular/core';
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
  mapType: String ="roadmap";

  location: Object ="";
  coordinates: GPSCoordinates[]=[];
  randomColorsArray : String[]=[];
  carsNames: Car[]=[];
  cars : CarData[]=[];
  focusLatitude: Number = 52.40973;
  focusLongitude: Number = 16.955353;

  constructor(private map: MapsService, private gpsService: GpsService, private carsService: CarService) {

  }
  public pieChartLabels:string[] = ["Jazda", "Postój", "Pauza", ];
  public pieChartData:number[] = [21, 39, 10];
  public pieChartType:string = 'pie';
  public pieChartOptions:any = {'backgroundColor': [
               "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB"
            ],
            "legend":{
                "position":"bottom"
              }
          }
  onGetAllCars(){
    this.carsService.getCars().subscribe((r:any)=>{
      r.forEach(car => {
         this.carsNames.push({Id:car.id,Name:car.carName});
      });
      this.fillCarsArray();
      //console.log(this.carsNames)
    })
  }
  onGetAllGPS(){

    this.gpsService.getCoordinates().subscribe((r:any)=>{
      r.forEach(gps => {
        this.coordinates.push({latitude:gps.latitude,longitude:gps.longitude,carId:gps.carId});
      });
      this.onGetAllCars();
    })
  }

  fillCarsArray(){
    this.coordinates.forEach(gps=>{
      let arrayId = this.isCarInArray(gps.carId);
      if(arrayId==-1){ 
        let gpsArray = [gps]
        this.cars.push({
          CarId:gps.carId,
          CarName:this.getCarName(gps.carId),
          LastLatitude:gps.latitude,
          LastLongitude:gps.longitude,
          Color:'#'+Math.floor(Math.random()*16777215).toString(16),
          GPSCoordinates:gpsArray,
          IsActive:false,
          Distance: 0
        });
      }
      else{ //auto w tabeli -> dodaje wspolrzedne
        this.cars[arrayId].GPSCoordinates.push(gps);
        this.cars[arrayId].LastLatitude=gps.latitude;
        this.cars[arrayId].LastLongitude=gps.longitude;
      }
    })
    console.log(this.cars)
    this.calculateDistance();

  }
  calculateDistance(){
    this.cars.forEach(car => {
      let deltaX=car.GPSCoordinates[0].latitude;
      let distanceX=0;
      let deltaY=car.GPSCoordinates[0].longitude;
      let distanceY=0;
      car.GPSCoordinates.forEach(gps => {
        distanceX=distanceX+Math.abs(gps.latitude-deltaX);
        distanceY=distanceY+Math.abs(gps.longitude-deltaY);
        deltaX=gps.latitude;
        deltaY=gps.longitude;

      });
      console.log(distanceX);
      console.log(distanceY);
      console.log(Math.pow(distanceX,2));
      let distance=(Math.sqrt(Math.pow(distanceX,2)+Math.pow(distanceY,2)))*110.57; //110.57km - 1 degree
      car.Distance=distance;
      console.log("dystans: "+distance);
    });


  }
  getCarName(carId:Number){
    let carName = "unknown"
    this.carsNames.forEach((car: Car) => {
      //console.log(car.Id)
      if(car.Id==carId){
        carName = car.Name;
      }
    });
    return carName
  }
  isCarInArray(carId:Number){ 
    //Funkcja sprawdza czy dla auta o podanym Id istnieje już tabela zawierająca współrzędne tego auta,
    //jesli tak, zwraca jej indeks, a jesli nie zwraca -1
    let indx=-1;
    this.cars.forEach((car:CarData,index) => {
      if(car.CarId==carId){ 
        indx = index;
      }
    });
    return indx;
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

  setCarActive(car:CarData){
    car.IsActive=true;
    this.focusLatitude=car.LastLatitude;
    this.focusLongitude=car.LastLongitude;

  }

  public chartClicked(e:any):void {
    console.log(e);
  }
 
 // event on pie chart slice hover
  public chartHovered(e:any):void {
    console.log(e);
  }
  ngOnInit(){
    this.onGetAllGPS();

  }
}
