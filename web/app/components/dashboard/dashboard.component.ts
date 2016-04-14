import {Component} from 'angular2/core';
import {Vehicle} from '../../models/Vehicle';
import {Driver} from '../../models/Driver';
import {COMMON_DIRECTIVES} from 'angular2/common';
declare var jQuery:any;
declare var io:any;

@Component({
    templateUrl: 'app/components/dashboard/dashboard.component.html',
    styleUrls: ['app/components/dashboard/dashboard.component.css'],
})
export class DashboardComponent {

  public vehicles: Vehicle[];
  public drivers: Driver[];
  public socket;

  constructor() {
    this.vehicles = [];
    this.drivers = [];
  }

  ngOnInit() {
    this.socket = io.connect();
    jQuery('.vehicles').on('change', 'select', (e) => {
      console.log("select changed", e);
      console.log("data", e.target.value)
      var driver = this.drivers.find((item) => item.name == e.target.value);
      console.log('driver', driver);
      console.log(e.target.dataset.vehicle);
      var vehicle = this.vehicles.find((item) => item.name == e.target.dataset.vehicle);
      console.log('vehicle', vehicle);
      vehicle.setOwner(driver);
    });
  }

  public createVehicle() {
    this.vehicles.push(new Vehicle());
    setTimeout(() =>jQuery('select').material_select(), 0);
  }

  public saveVehicle(vehicle) {
    console.log(vehicle);
    vehicle.save();
    //this.socket.emit('vehicle', JSON.stringify(vehicle));
  }

  public createDriver() {
    this.drivers.push(new Driver());
    setTimeout(() =>jQuery('select').material_select(), 0);
  }

  public saveDriver(driver) {
    console.log(driver);
    driver.save();
    //this.socket.emit('driver', driver);
  }

  public changed() {
    setTimeout(() =>jQuery('select').material_select(), 0);
    console.log('changed')
  }

}
