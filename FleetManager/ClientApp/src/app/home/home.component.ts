import { Component } from '@angular/core';
import { GPSCoordinates, FocusCoordinates } from '../gpsCoordinates';
import { Car } from '../car';
import { CarData } from '../carData';
import { GpsService } from '../gps.service';
import { CarService } from '../car.service';
import { SignalRService } from '.././services/signal-r.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  mapType: String ="roadmap"; 
  focusLatitude: Number = 52.40973;
  focusLongitude: Number = 16.955353;
  location: Object ="";
  coordinates: GPSCoordinates[]=[];
  randomColorsArray : String[]=[];
  carsNames: Car[]=[];
  cars : CarData[]=[];
  constructor(private gpsService: GpsService, private carsService: CarService,
    public signalRService: SignalRService, private http: HttpClient) {}
  onGetAllCars(){
    this.carsService.getCars().subscribe((r:any)=>{
      r.forEach(car => {
         this.carsNames.push({Id:car.id,Name:car.carName});
      });
      this.fillCarsArray(this.coordinates);
      //console.log(this.carsNames)
    })
  }
  onGetAllGPS(){

    this.gpsService.getCoordinates().subscribe((r:any)=>{
      r.forEach(gps => {
        this.coordinates.push({latitude:gps.latitude,longitude:gps.longitude,carId:gps.carId, timeStamp:gps.timeStamp, speed: gps.speed});
      });
      this.onGetAllCars();
    })
  }

  fillCarsArray(coordinates: GPSCoordinates[]){
    coordinates.forEach(gps=>{
      this.addGPSToCarArray(gps);
    })
    console.log(this.cars)
    this.calculateDistance();
  }

  private addGPSToCarArray(gps:GPSCoordinates) {
    let arrayId = this.isCarInArray(gps.carId);
      if(arrayId==-1){ //Nowe auto
        let gpsArray = [gps]
        this.cars.push({
          CarId:gps.carId,
          CarName:this.getCarName(gps.carId),
          LastLatitude:gps.latitude,
          LastLongitude:gps.longitude,
          Color:'#'+Math.floor(Math.random()*16777215).toString(16),
          GPSCoordinates:gpsArray,
          IsActive:false,
          Distance: 0,
          ActiveGPSCoordinates: gpsArray
        });
      }
      else{ //auto w tabeli -> dodaje wspolrzedne
        this.cars[arrayId].GPSCoordinates.push(gps);
        this.cars[arrayId].ActiveGPSCoordinates.push(gps);
        this.cars[arrayId].LastLatitude=gps.latitude;
        this.cars[arrayId].LastLongitude=gps.longitude;
      }
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
      let distance=(Math.sqrt(Math.pow(distanceX,2)+Math.pow(distanceY,2)))*110.57; //110.57km - 1 degree
      car.Distance=distance;
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

  setCarActive(car:CarData){
    car.IsActive=true;
    this.focusLatitude=car.LastLatitude;
    this.focusLongitude=car.LastLongitude;

  }

  ngOnInit(){
    this.onGetAllGPS();
    this.signalRService.startConnection();
    this.signalRService.addSignalRListener();
    this.subscribeToEvents();
  }
  getFocusCoordinates($event: FocusCoordinates) {
    this.focusLatitude = $event.latitude;
    this.focusLongitude = $event.longitude;
  }

  private subscribeToEvents(): void {  
    this.signalRService.messageReceived.subscribe((gps: GPSCoordinates) => {  
      console.log(gps)
      this.addGPSToCarArray(gps);
      this.calculateDistance();  
    });
    
  }  
}
