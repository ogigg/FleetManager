import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  constructor(private http: HttpClient) { }

  getCoordinates(){
    return this.http.get('http://localhost:5000/api/GPS')
  }
}
