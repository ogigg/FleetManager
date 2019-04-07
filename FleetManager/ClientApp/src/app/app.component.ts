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
  carCoordinates: GPSCoordinates[][]=[];
  randomColorsArray : String[]=[];
  constructor(private map: MapsService, private gpsService: GpsService) {

  }

  onGetAllGPS(){

    this.gpsService.getCoordinates().subscribe((r:any)=>{
      r.forEach(gps => {
        this.coordinates.push({latitude:gps.latitude,longitude:gps.longitude,carId:gps.carId});
      });
      this.fillCarArray();
    })
    console.log(this.coordinates)

  }
  fillCarArray(){
    //Funkcja wypelnia dwuwymiarowa tabele carCoordinates, przypisujac kazda tabele jednemu autu
    this.coordinates.forEach(gps=>{
      let arrayId = this.isCarInArray(gps.carId);
      if(arrayId==-1){ // auta nie ma w tabeli -> tworzy nowa tabele 
        let gpsArray = [gps]
        this.carCoordinates.push(gpsArray);
      }
      else{ //auto w tabeli -> dodaje wspolrzedne
        this.carCoordinates[arrayId].push(gps);
      }
    })
    console.log(this.carCoordinates)

    for(let i=0;i<this.carCoordinates.length;i++){
      this.randomColorsArray.push('#'+Math.floor(Math.random()*16777215).toString(16));
    }

     console.log(this.randomColorsArray)
  }

  isCarInArray(carId:Number){ 
    //Funkcja sprawdza czy dla auta o podanym Id istnieje już tabela zawierająca współrzędne tego auta,
    //jesli tak, zwraca jej indeks, a jesli nie zwraca -1
    let indx=-1;
    this.carCoordinates.forEach((gpsArray:GPSCoordinates[],index) => {
      gpsArray.forEach((gps:GPSCoordinates) => {
        if(gps.carId==carId){ 
          indx = index;
        }
      });
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
    
  }
  ngOnInit(){
    this.onGetAllGPS();

  }
}
