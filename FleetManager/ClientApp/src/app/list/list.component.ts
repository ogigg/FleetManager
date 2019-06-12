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
  public pieChartLegend : Boolean = false;

  calculateStatistisc(car:CarData){
    let drive=0;
    let stop=0;
    let pause=150;
    car.ActiveGPSCoordinates.forEach(gps => {
      if(gps.speed>0) drive++;
      if(gps.speed == 0) stop ++;
    });
    let sum=drive+stop+pause;
    //Obliczanie procentowej wartości
    drive = Number((drive/sum * 100).toFixed(2));
    stop = Number((stop/sum * 100).toFixed(2));
    pause = Number((pause/sum * 100).toFixed(2));

    this.setChartData(drive,stop,pause);
  }
  setChartData(set1:number,set2:number,set3:number){
    this.pieChartData[0]=set1;
    this.pieChartData[1]=set2;
    this.pieChartData[2]=set3;
    console.log("updated!")
    console.log(this.pieChartData)
    //Przeladuj wykres
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left'; //Przeladuj wykres
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

  onMoreOptions(car:CarData){
    this.calculateStatistisc(car)
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
    this.calculateStatistisc(car)
    
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
    this.calculateStatistisc(car)
  }
  onClickCalendar(car:CarData){
    car.ActiveGPSCoordinates=[];
    car.GPSCoordinates.forEach((gps:GPSCoordinates) => {
      let gpsTimestamp = new Date(gps.timeStamp); 
      if(this.isDate(gpsTimestamp,this.selectedDate)){
        car.ActiveGPSCoordinates.push(gps);
      }
    });
    car.Distance=this.calculateDistance(car.ActiveGPSCoordinates);
    this.calculateStatistisc(car)
  }
  onClickAll(car:CarData){
    car.ActiveGPSCoordinates=car.GPSCoordinates;
    car.Distance=this.calculateDistance(car.ActiveGPSCoordinates);
    this.calculateStatistisc(car)
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
    if(ActiveGPSCoordinates.length==0) return 0;
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
