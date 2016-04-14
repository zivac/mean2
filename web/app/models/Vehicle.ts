import {Model} from '../core/Model';
import {Driver} from './Driver';

export class Vehicle extends Model {

  public name: String;
  public wheels: Number;
  public speed: Number;
  public owner: Driver;

  constructor() {
    super();
  }

  public drive() {
    console.log('whoosh');
  }

  public setOwner(driver) {
    console.log('selected driver', driver)
    if(this.owner) this.owner.removeVehicle(this);
    this.owner = driver;
    if(this.owner) this.owner.addVehicle(this);
  }

}
