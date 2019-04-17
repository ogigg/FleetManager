import { GPSCoordinates } from './gpsCoordinates';

export class CarData {
  
  public LastLatitude: Number;
  public LastLongitude: Number;
  public CarId: number;
  public CarName: String;
  public GPSCoordinates : GPSCoordinates[];
  public Color: String;
  public IsActive: Boolean;
  public Distance: number;
  }
