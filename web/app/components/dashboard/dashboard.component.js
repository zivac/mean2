System.register(['angular2/core', '../../models/Vehicle', '../../models/Driver'], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Vehicle_1, Driver_1;
    var DashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Vehicle_1_1) {
                Vehicle_1 = Vehicle_1_1;
            },
            function (Driver_1_1) {
                Driver_1 = Driver_1_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent() {
                    this.vehicles = [];
                    this.drivers = [];
                }
                DashboardComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.socket = io.connect();
                    jQuery('.vehicles').on('change', 'select', function (e) {
                        console.log("select changed", e);
                        console.log("data", e.target.value);
                        var driver = _this.drivers.find(function (item) { return item.name == e.target.value; });
                        console.log('driver', driver);
                        console.log(e.target.dataset.vehicle);
                        var vehicle = _this.vehicles.find(function (item) { return item.name == e.target.dataset.vehicle; });
                        console.log('vehicle', vehicle);
                        vehicle.setOwner(driver);
                    });
                };
                DashboardComponent.prototype.createVehicle = function () {
                    this.vehicles.push(new Vehicle_1.Vehicle());
                    setTimeout(function () { return jQuery('select').material_select(); }, 0);
                };
                DashboardComponent.prototype.saveVehicle = function (vehicle) {
                    console.log(vehicle);
                    vehicle.save();
                    //this.socket.emit('vehicle', JSON.stringify(vehicle));
                };
                DashboardComponent.prototype.createDriver = function () {
                    this.drivers.push(new Driver_1.Driver());
                    setTimeout(function () { return jQuery('select').material_select(); }, 0);
                };
                DashboardComponent.prototype.saveDriver = function (driver) {
                    console.log(driver);
                    driver.save();
                    //this.socket.emit('driver', driver);
                };
                DashboardComponent.prototype.changed = function () {
                    setTimeout(function () { return jQuery('select').material_select(); }, 0);
                    console.log('changed');
                };
                DashboardComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/components/dashboard/dashboard.component.html',
                        styleUrls: ['app/components/dashboard/dashboard.component.css'],
                    }), 
                    __metadata('design:paramtypes', [])
                ], DashboardComponent);
                return DashboardComponent;
            })();
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});
//# sourceMappingURL=dashboard.component.js.map