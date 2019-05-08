import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CarData } from '../carData';
import { FocusCoordinates } from '../gpsCoordinates';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() cars : CarData[]=[];
  @Output() focusCoordinates = new EventEmitter<FocusCoordinates>();
  constructor() { }
  focusLatitude: Number = 52.40973;
  focusLongitude: Number = 16.955353;
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
    car.IsActive=true;
    this.focusLatitude=car.LastLatitude;
    this.focusLongitude=car.LastLongitude;
    FocusCoordinates
    //let fc: FocusCoordinates = {latitude:this.focusLatitude,longitude:this.focusLongitude};
    this.focusCoordinates.emit({latitude:this.focusLatitude,longitude:this.focusLongitude});

  }
  ngOnInit() {
  }

}
