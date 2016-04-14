System.register(['../core/Model'], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Model_1;
    var Driver;
    return {
        setters:[
            function (Model_1_1) {
                Model_1 = Model_1_1;
            }],
        execute: function() {
            Driver = (function (_super) {
                __extends(Driver, _super);
                function Driver() {
                    _super.call(this);
                    this.vehicles = [];
                }
                Driver.prototype.addVehicle = function (vehicle) {
                    this.vehicles.push(vehicle);
                };
                Driver.prototype.removeVehicle = function (vehicle) {
                    this.vehicles = this.vehicles.filter(function (item) { return item != vehicle; });
                };
                return Driver;
            })(Model_1.Model);
            exports_1("Driver", Driver);
        }
    }
});
//# sourceMappingURL=Driver.js.map