import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { GPSCoordinates } from '../gpsCoordinates';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  messageReceived = new EventEmitter<GPSCoordinates>();  
  private hubConnection: signalR.HubConnection
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('http://localhost:5000/signalr')
                            .build();
 
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addSignalRListener(){
    this.hubConnection.on('SendAsync', (gps: GPSCoordinates) => { 
    this.messageReceived.emit(gps); 
    console.log("dostałem msg!") 
    //console.log({latitude:gps.latitude,longitude:gps.longitude,carId:gps.carId, timeStamp:gps.timeStamp})
    });
  }




  constructor() { }

}
