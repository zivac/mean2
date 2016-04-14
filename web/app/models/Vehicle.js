System.register(['../core/Model'], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Model_1;
    var Vehicle;
    return {
        setters:[
            function (Model_1_1) {
                Model_1 = Model_1_1;
            }],
        execute: function() {
            Vehicle = (function (_super) {
                __extends(Vehicle, _super);
                function Vehicle() {
                    _super.call(this);
                }
                Vehicle.prototype.drive = function () {
                    console.log('whoosh');
                };
                Vehicle.prototype.setOwner = function (driver) {
                    console.log('selected driver', driver);
                    if (this.owner)
                        this.owner.removeVehicle(this);
                    this.owner = driver;
                    if (this.owner)
                        this.owner.addVehicle(this);
                };
                return Vehicle;
            })(Model_1.Model);
            exports_1("Vehicle", Vehicle);
        }
    }
});
//# sourceMappingURL=Vehicle.js.map