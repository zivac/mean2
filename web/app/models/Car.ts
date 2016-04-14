import {Vehicle} from './Vehicle';

export class Car extends Vehicle {

  public year:Number;

  constructor() {
    super();
    this.wheels = 4;
  }

  public drive() {
    console.log('wroom');
  }

}
