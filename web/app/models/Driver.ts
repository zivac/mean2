import {Model} from '../core/Model';
import {Vehicle} from "./Vehicle";

export class Driver extends Model {

  public name: String;
  public age: Number;
  public picture: String;
  public vehicles: Vehicle[];

  constructor() {
    super();
    this.vehicles = [];
  }

  public addVehicle(vehicle) {
    this.vehicles.push(vehicle);
  }

  public removeVehicle(vehicle) {
    this.vehicles = this.vehicles.filter((item) => item != vehicle);
  }

}
