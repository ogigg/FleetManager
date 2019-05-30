import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CarData } from '../carData';
import { FocusCoordinates, GPSCoordinates } from '../gpsCoordinates';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() cars : CarData[]=[];
  @Output() focusCoordinates = new EventEmitter<FocusCoordinates>();
  constructor() { }
  selectedDate: Date;
  focusLatitude: Number = 52.40973;
  focusLongitude: Number = 16.955353;
  moreOptions: Boolean = false;
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

  setCarActive(car:CarData){
    this.selectedDate=null;
    car.IsActive=true;
    this.focusLatitude=car.LastLatitude;
    this.focusLongitude=car.LastLongitude;
    this.moreOptions=false;
    //let fc: FocusCoordinates = {latitude:this.focusLatitude,longitude:this.focusLongitude};
    this.focusCoordinates.emit({latitude:this.focusLatitude,longitude:this.focusLongitude});

  }
  ngOnInit() {
  }

  onClickToday(car:CarData){
    this.selectedDate=new Date();
    car.ActiveGPSCoordinates=[];
    car.GPSCoordinates.forEach((gps:GPSCoordinates) => {
      let gpsTimestamp = new Date(gps.timeStamp); 
      if(this.isToday(gpsTimestamp)){
        car.ActiveGPSCoordinates.push(gps);
      }
    });
    car.Distance=this.calculateDistance(car.ActiveGPSCoordinates);
    
  }
  onClickThisWeek(car:CarData){
    car.ActiveGPSCoordinates=[];
    car.GPSCoordinates.forEach((gps:GPSCoordinates) => {
      let gpsTimestamp = new Date(gps.timeStamp); 
      if(this.isLastWeek(gpsTimestamp)){
        car.ActiveGPSCoordinates.push(gps);
      }
    });
    car.Distance=this.calculateDistance(car.ActiveGPSCoordinates);
  }
  onClickCalendar(car:CarData){
    console.log("KALENDARZ KLIKLO")
    car.ActiveGPSCoordinates=[];
    car.GPSCoordinates.forEach((gps:GPSCoordinates) => {
      let gpsTimestamp = new Date(gps.timeStamp); 
      if(this.isDate(gpsTimestamp,this.selectedDate)){
        car.ActiveGPSCoordinates.push(gps);
      }
    });
    car.Distance=this.calculateDistance(car.ActiveGPSCoordinates);
  }
  onClickAll(car:CarData){
    car.ActiveGPSCoordinates=car.GPSCoordinates;
    car.Distance=this.calculateDistance(car.ActiveGPSCoordinates);
  }
  private isToday = (date) => {
    let today = new Date()
    return date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()
  }
  private isLastWeek = (date) => {
    let today = new Date().getTime()
    let weekAgo = new Date(today - (7 * 24 * 60 * 60 * 1000)).getTime();
    if(date.getTime()>=weekAgo && date.getTime()<=today ){
      return true;
    }
    return false;
  }
  private isDate = (dateToCheck,selectedDate) => {
    let date = new Date(selectedDate)
    return dateToCheck.getDate() == date.getDate() && dateToCheck.getMonth() == date.getMonth() && dateToCheck.getFullYear() == date.getFullYear()
  }
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }

  calculateDistance(ActiveGPSCoordinates: GPSCoordinates[]){
      let deltaX=ActiveGPSCoordinates[0].latitude;
      let distanceX=0;
      let deltaY=ActiveGPSCoordinates[0].longitude;
      let distanceY=0;
      ActiveGPSCoordinates.forEach(gps => {
        distanceX=distanceX+Math.abs(gps.latitude-deltaX);
        distanceY=distanceY+Math.abs(gps.longitude-deltaY);
        deltaX=gps.latitude;
        deltaY=gps.longitude;

      });
      let distance=(Math.sqrt(Math.pow(distanceX,2)+Math.pow(distanceY,2)))*110.57; //110.57km - 1 degree
      return distance;
  }

}
