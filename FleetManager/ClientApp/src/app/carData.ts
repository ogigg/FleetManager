import { GPSCoordinates } from './gpsCoordinates';

export class CarData {
  
  public lastLatitude: Number;
  public lastLongitude: Number;
  public carId: number;
  public carName: String;
  public gpsCoordinates : GPSCoordinates[];
  public color: String;
  public isActive: Boolean;
  }